import { CogniteCadModel, TreeIndexNodeCollection } from '@cognite/reveal';
import {
  AssetMetadataSimpleDto,
  Echo3dViewer,
  ModelsClient,
} from '@equinor/echo-3d-viewer';
import { BehaviorSubject } from 'rxjs';
import { type Box3 } from 'three';

export type ViewerOptions = {
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
  userModelsMeta: AssetMetadataSimpleDto[];

  private model: BehaviorSubject<CogniteCadModel | undefined>;

  public get currentModel(): CogniteCadModel | undefined {
    return this.model.value;
  }

  constructor(args: { modelApiClient: ModelsClient; viewer: Echo3dViewer }) {
    this.modelApiClient = args.modelApiClient;
    this.viewer = args.viewer;

    this.userModelsMeta = [];

    this.model = new BehaviorSubject<CogniteCadModel | undefined>(undefined);
  }

  getLocalModel(plantCode: string) {
    const localModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    if (localModelsJson) {
      const localModels = JSON.parse(localModelsJson);
      return localModels[plantCode] || undefined;
    }
    return undefined;
  }

  setLocalModel(modelMeta: AssetMetadataSimpleDto) {
    const plantCode = modelMeta.plantCode;
    const platformSectionId = modelMeta.platformSectionId;

    const existingModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    const existingModels = existingModelsJson ? JSON.parse(existingModelsJson) : {};

    existingModels[plantCode] = platformSectionId;

    localStorage.setItem(LOCAL_MODEL_ID_KEY, JSON.stringify(existingModels));
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

    const model = await this._loadModelInViewer(modelMeta, options);
    this.model.next(model);
  }

  private async _loadModelInViewer(
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

  private _findModelById(models: AssetMetadataSimpleDto[], modelId?: number) {
    return models.find((model) => model.id === modelId);
  }

  async getModelsForPlant(plantCode: string) {
    const models = await this._getModels();
    return this._filterModelsByPlantCode(models, plantCode);
  }

  async loadModelById(modelId: number, options?: ViewerOptions) {
    const userModels = await this.setUserModels();
    const model = this._findModelById(userModels, modelId);
    this._loadModel(model, options);
  }
}
