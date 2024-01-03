import { HtmlOverlayOptions, HtmlOverlayTool } from '@cognite/reveal/tools';

import { throttle } from 'throttle-typescript';
import { debounce } from '../utils/debounceUtils';
import { Echo3dViewer } from '@equinor/echo-3d-viewer';

type HtmlOverlayElement = {
  position3D: THREE.Vector3;
  options: HtmlOverlayOptions;

  state: {
    visible: boolean;
    position2D: THREE.Vector2;
    width: number;
    height: number;
  };
};

/**
 * A HtmlOverlayToolHandler that tries to improve the performance of reveals HtmlOverlayTool
 * In reveal the sceneRendered event is fired very often (in reveal animation loop) and thus recalculation of clustering and position for html overlays happen too often for many overlays
 * This class is an attempt at fixing this by adding throttle to the sceneRendered handling
 * Code will also update throttle frequency if add and remove is used
 */
export class HtmlOverlayToolHandler {
  private htmlOverlayTool: HtmlOverlayTool;

  private throttleParam = 1000 / 30;

  /**
   * The constructor for the handler.
   * This will remove the current sceneRendered handler and apply our own that uses throttle for performance improvements
   * It also adds debounce to scheduleUpdate as a performance improvement
   * @param htmlOverlayTool the htmlOverlayTool to use
   */
  constructor(htmlOverlayTool: HtmlOverlayTool) {
    this.htmlOverlayTool = htmlOverlayTool;

    this.EchoViewer.off('sceneRendered', this.ToolsOnSceneRenderedHandler);

    this.EchoViewer.on('sceneRendered', this.echoOnScreenRenderedHandler);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- need to override method
    (this.htmlOverlayTool as any).scheduleUpdate = debounce(() => {
      if (this.isDisposed) {
        // Code runs a bit async so sometimes if you turn on/off clustering and/or tag overlay (from settings menu) it can occur that the previous overlay tool is disposed and this gets rid of the error being thrown.
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any -- need to force update
      (this.htmlOverlayTool as any).forceUpdate();
    }, 100);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- need to override method
    (this.htmlOverlayTool as any).commitDOMChanges = this.commitDOMChanges;
  }

  /**
   * Override the element moving to use translate:transform instead of position.top/position.left
   *
   */
  commitDOMChanges = () => {
    const { offsetTop } = this.EchoViewer.canvas;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-underscore-dangle,, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any  -- need to override method
    (this.htmlOverlayTool as any)._htmlOverlays.forEach(
      (element: HtmlOverlayElement, htmlElement: HTMLElement) => {
        const {
          visible,
          position2D: { x, y },
        } = element.state;

        const { style } = htmlElement;
        style.transform = `translate(${x + offsetTop}px, ${y}px)`;
        if (!style.top) style.top = '0px';

        if (visible && style.visibility !== 'visible') {
          style.visibility = 'visible';
          style.opacity = '1';
          style.transition = 'opacity 0.2s linear';
        } else if (!visible && style.visibility !== 'hidden') {
          style.visibility = 'hidden';
          style.opacity = '0';
          style.transition = 'visibility 0s 0.2s, opacity 0.2s linear';
        }
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-underscore-dangle, @typescript-eslint/no-explicit-any -- need to override method
    (this.htmlOverlayTool as any)._compositeOverlays.forEach((htmlElement: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any -- need to override method
      (this.htmlOverlayTool as any).viewerDomElement.appendChild(htmlElement);
    });
  };

  /**
   * This will removed the current sceneRendered and add a new one. This is needed when throttle value updates
   */
  private updateOnSceneRenderedHandler() {
    this.EchoViewer.off('sceneRendered', this.echoOnScreenRenderedHandler);

    this.EchoViewer.on('sceneRendered', this.echoOnScreenRenderedHandler);
  }

  /**
   * Method for calculating the updates per secund based on the number of elements the html tool has
   * @returns updates per seconds
   */
  private getUpdatesPerSecondForNumberOfElements() {
    if (this.htmlOverlayTool.elements.length < 10) return 30;
    if (this.htmlOverlayTool.elements.length < 50) return 20;
    if (this.htmlOverlayTool.elements.length < 100) return 10;
    return 5;
  }

  /**
   * Method for adding new elements to the html overlay tool
   * @param htmlElement the element to add
   * @param position3D the position of the element to add
   * @param options options for this element
   */
  add(htmlElement: HTMLElement, position3D: THREE.Vector3, options?: HtmlOverlayOptions) {
    if (this.isDisposed) return;
    const updatesPerSeconds = this.getUpdatesPerSecondForNumberOfElements();
    if (1000 / updatesPerSeconds !== this.throttleParam) {
      this.updateThrottleParam(1000 / updatesPerSeconds);
    }
    this.htmlOverlayTool.add(htmlElement, position3D, options);
  }

  /**
   * Method for removing a element from the html overlay tool
   * @param htmlElement the element to remove
   */
  remove(htmlElement: HTMLElement) {
    if (this.isDisposed) return;
    this.htmlOverlayTool.remove(htmlElement);
    const updatesPerSeconds = this.getUpdatesPerSecondForNumberOfElements();
    if (1000 / updatesPerSeconds !== this.throttleParam) {
      this.updateThrottleParam(1000 / updatesPerSeconds);
    }
  }

  /**
   * Method for disposing the handler and the htmlOverlayTool
   */
  dispose() {
    this.EchoViewer.off('sceneRendered', this.echoOnScreenRenderedHandler);
    if (this.isDisposed) return;
    this.htmlOverlayTool.dispose();
  }

  private readonly echoOnScreenRenderedHandler = throttle(
    (event: {
      frameNumber: number;
      renderTime: number;
      renderer: THREE.WebGLRenderer;
      camera: THREE.PerspectiveCamera;
    }) => {
      this.ToolsOnSceneRenderedHandler(event);
    },
    this.throttleParam
  );

  /**
   * Method for updating the throttle param
   * @param newParam the new param to use
   */
  private updateThrottleParam(newParam: number) {
    this.throttleParam = newParam;
    this.updateOnSceneRenderedHandler();
  }

  /**
   * Returns the htmlOverlayTool for this handler
   * @returns htmlOverlayTool
   */
  get HtmlOverlayTool() {
    return this.htmlOverlayTool;
  }

  /**
   * Returns the htmlOverlayTools disposed property
   * @returns disposed
   */
  get isDisposed() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, no-underscore-dangle -- override here so we don't have to disable everywhere
    return (this.HtmlOverlayTool as any)._disposed as boolean;
  }

  /**
   * Returns the Echo3dViewer attached to the htmlOverlay
   * @returns Echo3dViewer
   */
  get EchoViewer(): Echo3dViewer {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, no-underscore-dangle -- override here so we don't have to disable everywhere
    return (this.htmlOverlayTool as any)._viewer as Echo3dViewer;
  }

  /**
   * Returns the htmlOverlayTools onSceneRenderedHandler
   * @returns onSceneRenderedHandler
   */
  get ToolsOnSceneRenderedHandler() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, no-underscore-dangle -- override here so we don't have to disable everywhere
    return (this.htmlOverlayTool as any)._onSceneRenderedHandler as (event: {
      frameNumber: number;
      renderTime: number;
      renderer: THREE.WebGLRenderer;
      camera: THREE.PerspectiveCamera;
    }) => void;
  }
}
