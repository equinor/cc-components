import { CogniteCadModel, IndexSet, TreeIndexNodeCollection } from '@cognite/reveal';
import {
  AssetMetadataSimpleDto,
  Echo3dViewer,
  ModelsClient,
  getNumericRange,
  getTopNodes,
} from '@equinor/echo-3d-viewer';
import { BehaviorSubject, Observable } from 'rxjs';
import { type Box3 } from 'three';

interface IModelService {}

type ViewerOptions = {
  enableSelectionByPicking?: boolean | undefined;
  bounds?: Box3 | undefined;
};
export type Layer = {
  key: string;
  type: string;
  label: string;
  subLabel?: string;
  nodeCollection: TreeIndexNodeCollection;
};

const LOCAL_MODEL_ID_KEY = 'echoModelId';

export class ModelService {
  modelApiClient: ModelsClient;
  viewer: Echo3dViewer;

  // Model meta data observables
  modelMeta?: AssetMetadataSimpleDto;
  modelsMeta: BehaviorSubject<AssetMetadataSimpleDto[]>;
  userModelsMeta: AssetMetadataSimpleDto[];

  private model: BehaviorSubject<CogniteCadModel | undefined>;

  public get currentModels$(): Observable<AssetMetadataSimpleDto[]> {
    return this.modelsMeta?.asObservable();
  }

  public get currentModel(): CogniteCadModel | undefined {
    return this.model.value;
  }

  constructor(args: { modelApiClient: ModelsClient; viewer: Echo3dViewer }) {
    this.modelApiClient = args.modelApiClient;
    this.viewer = args.viewer;

    this.userModelsMeta = [];
    this.modelsMeta = new BehaviorSubject<AssetMetadataSimpleDto[]>([]);
    this.model = new BehaviorSubject<CogniteCadModel | undefined>(undefined);
  }

  private getLocalModelId() {
    const localModelId = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    return localModelId ? Number(localModelId) : undefined;
  }

  private setLocalModelID(modelId: number) {
    localStorage.setItem(LOCAL_MODEL_ID_KEY, modelId.toString());
  }

  private async _getModels() {
    try {
      const models = await this.modelApiClient.listModels(
        'Reveal',
        '9',
        undefined,
        undefined
      );
      if (models.length === 0) {
        throw new Error('No awaitable models for current user');
      }
      return models;
    } catch (error) {
      throw new Error('Could not load 3d models');
    }
  }

  private async setUserModels() {
    if (this.userModelsMeta.length > 0) return this.userModelsMeta;
    this.userModelsMeta = await this._getModels();
    return this.userModelsMeta;
  }

  private _filterModelsByPlantCode(models: AssetMetadataSimpleDto[], plantCode: string) {
    return models.filter(
      (model) => model.plantCode.toLocaleLowerCase() === plantCode.toLocaleLowerCase()
    );
  }

  private async setModelsByPlantCode(
    plantCode: string,
    modelId?: number,
    options?: ViewerOptions
  ) {
    const userModels = await this.setUserModels();

    const model = this.findModelById(userModels, modelId);
    if (model && model.plantCode !== plantCode) {
      // this.loadModelInViewer(model, options);
      // return;
    }

    const currentModels = this._filterModelsByPlantCode(userModels, plantCode);
    this.modelMeta = this._getDefaultModelForPlant(currentModels);
    this.modelsMeta?.next(currentModels);

    if (this.modelMeta) {
      this._loadModel(this.modelMeta, options);
    }
  }

  async getLayers() {
    if (!this.modelMeta) return [];

    const topNodes = await getTopNodes(this.modelMeta.hierarchyId);

    if (!topNodes) return [];

    const projectTopNodes = topNodes.results.filter((topNode) => {
      const dbDesc = topNode.pdmsData.DbDesc;
      if (typeof dbDesc === 'string') {
        console.log(dbDesc);
        return (
          dbDesc.toLocaleLowerCase().includes('pro') ||
          dbDesc.toLocaleLowerCase().includes('asb')
        );
      }
    });

    const projectSelectionsMap = projectTopNodes.reduce((acc, topNode) => {
      const { type, label, subLabel } = this.getTopNodeProjectInfo(
        topNode.pdmsData.DbDesc
      );
      const key = label.toLowerCase();

      if (!acc[key]) {
        const nodeCollection = new TreeIndexNodeCollection();
        const indexSet = nodeCollection.getIndexSet();
        indexSet.addRange(getNumericRange(topNode));
        acc[key] = { key, type, label, subLabel, nodeCollection };
      } else {
        const indexSet = acc[key].nodeCollection.getIndexSet();
        indexSet.addRange(getNumericRange(topNode));
      }

      return acc;
    }, {} as Record<string, Layer>);
    return Object.keys(projectSelectionsMap).map((key) => projectSelectionsMap[key]);
  }

  private getTopNodeProjectInfo(dbDesc: string) {
    let [text] = dbDesc.split(',');
    let subLabel: undefined | string;

    const possibleLayerText = text.split(':');
    if (possibleLayerText[0]) {
      [text, subLabel] = possibleLayerText;
    }

    let [type, label] = text.split(']');
    type = type.replace('[', '').trim();
    subLabel = subLabel?.trim();
    label = label.trim();
    return { type, label, subLabel };
  }

  private async getProjectLayers() {}

  private _initializeCamera(model: CogniteCadModel) {
    const cameraConfiguration = model.getCameraConfiguration();
    const position = cameraConfiguration?.position;
    const target = cameraConfiguration?.target;

    if (!position || !target) {
      this.viewer.initializeFirstPersonControlsUsingModelAsBoundingBox(model);
      return model;
    }

    this.viewer.initializeFirstPersonControlsUsingTarget(position, target);
  }

  private async _loadModel(
    modelMeta?: AssetMetadataSimpleDto,
    options?: {
      enableSelectionByPicking?: boolean | undefined;
      bounds?: Box3 | undefined;
    }
  ) {
    if (this.model.value) {
      this.viewer.removeModel(this.model.value);
    }

    const model = await this.loadModelInViewer(modelMeta, options);
    this.model.next(model);
  }

  private async loadModelInViewer(
    modelMeta?: AssetMetadataSimpleDto,
    options?: {
      enableSelectionByPicking?: boolean | undefined;
      bounds?: Box3 | undefined;
    }
  ) {
    if (!modelMeta) {
      // Todo: Write as model viewer custom Error.
      throw new Error('No model selected!');
    }

    if (!options) {
      options = { enableSelectionByPicking: true };
    }

    const model = await this.viewer.loadModel(
      modelMeta,
      options.enableSelectionByPicking
    );
    this._initializeCamera(model);
    return model;
  }

  private findModelById(models: AssetMetadataSimpleDto[], modelId?: number) {
    return models.find((model) => model.id === modelId);
  }

  private _getDefaultModelForPlant(availableModelsForPlant: AssetMetadataSimpleDto[]) {
    if (availableModelsForPlant.length === 0) return undefined;
    // Use As-built if available, if not, just choose the first model in list
    const defaultModel = availableModelsForPlant.find((m) => {
      const id = m.platformSectionId.toLocaleLowerCase();
      id.startsWith('asb-');
      return id === 'asb-pro' || id === 'full-pro';
    });
    return defaultModel ?? availableModelsForPlant[0];
  }

  async loadModel(plantCode: string, options?: ViewerOptions) {
    const modelId = this.getLocalModelId();
    await this.setModelsByPlantCode(plantCode, modelId, options);
  }

  async loadModelById(modelId: number, options?: ViewerOptions) {
    const model = this.findModelById(this.userModelsMeta, modelId);
    this.loadModelInViewer(model, options);
  }
}
