# Fusion Move Viewer

> Powered by Echo 3d Viewer and Reveal

### Model Loading

The following diagram shows the internal code journey to load a model in the model.

```mermaid
sequenceDiagram
    participant ModelViewer
    participant ContextResolver
    participant ModelViewerModule
    participant ModelService



    Note over ModelViewer: context and Tags are provided as props to the ModelViewer.

    ModelViewer->>ContextResolver: Provides context for context resolving.
    Note over ContextResolver: Resolves fusion context to facility id/id's. AKA instCode.

    ContextResolver-->>ModelViewer: Reserves the current instCode/s that will be used in viewer setup.
    ModelViewer->>ModelViewerModule: The model viewer calls the setup with viewer canvas.

    Note over ModelViewerModule: Calls the Echo 3d viewer setup function with the provided canvas and and client information.

    ModelViewerModule->>ModelService: Instantiates Model service with the created 3d Viewer and the Echo Model Client.
    ModelService->>EchoModelAPI: Calls external api models meta data.
    ModelService->>LocalClientStorage: Lookup for local model id for faster load.
    LocalClientStorage-->>ModelService: Receives local stored model id.
    EchoModelAPI-->>ModelService: Receives a list of the available models.
    Note over ModelService: Filters list of awaitable models according to the provided context.
    Note over ModelService: Awaits the user input for model selection of uses local modelId.
    ModelService->>LocalClientStorage: If new id then stores selected model id for faster load next time.

    ModelService->>ModelViewerModule: Load current model.
    ModelViewerModule-->>ModelViewer: Append to viewer and Mounts a 3d viewer to the canvas.


```

Get details about a clicked 3D element
```ts

  useEffect(() => {
    const callback = async (e: Event) => {
      const index = (e as Test).detail.treeIndex;

      const data = selectionControls.getNodeFromTreeId(index);
      console.log({ data });
    };

    window.addEventListener('selectionStarted', callback);

    return () => {
      window.removeEventListener('selectionStarted', callback);
    };
  }, [selectionControls]);
```

