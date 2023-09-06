import { CogniteCadModel, TreeIndexNodeCollection } from '@cognite/reveal';
import {
  AssetMetadataSimpleDto,
  Echo3dViewer,
  ModelsClient,
} from '@equinor/echo-3d-viewer';
import { BehaviorSubject, Observable } from 'rxjs';
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
  #modelApiClient: ModelsClient;
  #viewer: Echo3dViewer;

  #modelMeta$: BehaviorSubject<AssetMetadataSimpleDto | undefined>;
  #userModelsMeta$: AssetMetadataSimpleDto[];

  #model$: BehaviorSubject<CogniteCadModel | undefined>;

  get currentModel(): CogniteCadModel | undefined {
    return this.#model$.value;
  }

  get currentModelMeta(): AssetMetadataSimpleDto | undefined {
    return this.#modelMeta$.value;
  }

  get modelMeta$(): Observable<AssetMetadataSimpleDto | undefined> {
    return this.#modelMeta$.asObservable();
  }

  get model$(): Observable<CogniteCadModel | undefined> {
    return this.#model$.asObservable();
  }

  constructor(args: { modelApiClient: ModelsClient; viewer: Echo3dViewer }) {
    this.#modelApiClient = args.modelApiClient;
    this.#viewer = args.viewer;

    this.#userModelsMeta$ = [];

    this.#model$ = new BehaviorSubject<CogniteCadModel | undefined>(undefined);
    this.#modelMeta$ = new BehaviorSubject<AssetMetadataSimpleDto | undefined>(undefined);
  }

  async #getModelsMeta() {
    try {
      const models = await this.#modelApiClient.listModels(
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

  async #setUserModels() {
    if (this.#userModelsMeta$.length > 0) return this.#userModelsMeta$;
    this.#userModelsMeta$ = await this.#getModelsMeta();
    return this.#userModelsMeta$;
  }

  #filterModelsByPlantCode(models: AssetMetadataSimpleDto[], plantCode: string) {
    return models.filter(
      (model) => model.plantCode.toLocaleLowerCase() === plantCode.toLocaleLowerCase()
    );
  }

  #initializeCamera(model: CogniteCadModel) {
    const cameraConfiguration = model.getCameraConfiguration();
    const position = cameraConfiguration?.position;
    const target = cameraConfiguration?.target;

    if (!position || !target) {
      this.#viewer.initializeFirstPersonControlsUsingModelAsBoundingBox(model);
      return model;
    }

    this.#viewer.initializeFirstPersonControlsUsingTarget(position, target);
  }

  async #loadModel(
    modelMeta?: AssetMetadataSimpleDto,
    options?: {
      enableSelectionByPicking?: boolean | undefined;
      bounds?: Box3 | undefined;
    }
  ) {
    if (this.#model$.value) {
      this.#viewer.removeModel(this.#model$.value);
    }

    if (!modelMeta) {
      throw new Error('No model selected!');
    }

    if (!options) {
      options = { enableSelectionByPicking: true };
    }

    const model = await this.#viewer.loadModel(
      modelMeta,
      options.enableSelectionByPicking
    );
    this.#model$.next(model);
    this.#initializeCamera(model);
    return model;
  }

  #findModelById(models: AssetMetadataSimpleDto[], modelId?: number) {
    return models.find((model) => model.id === modelId);
  }

  async getModelsForPlant(plantCode: string) {
    const models = await this.#getModelsMeta();
    return this.#filterModelsByPlantCode(models, plantCode);
  }

  async loadModelById(
    modelId: number,
    options?: ViewerOptions
  ): Promise<CogniteCadModel> {
    const userModels = await this.#setUserModels();
    const modelMeta = this.#findModelById(userModels, modelId);
    this.#modelMeta$.next(modelMeta);
    return this.#loadModel(modelMeta, options);
  }

  getLocalModel(plantCode: string): string | undefined {
    const localModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    if (localModelsJson) {
      const localModels = JSON.parse(localModelsJson);
      return localModels[plantCode] || undefined;
    }
    return undefined;
  }

  setLocalModel(modelMeta: AssetMetadataSimpleDto): void {
    const plantCode = modelMeta.plantCode;
    const platformSectionId = modelMeta.platformSectionId;

    const existingModelsJson = localStorage.getItem(LOCAL_MODEL_ID_KEY);
    const existingModels = existingModelsJson ? JSON.parse(existingModelsJson) : {};

    existingModels[plantCode] = platformSectionId;

    localStorage.setItem(LOCAL_MODEL_ID_KEY, JSON.stringify(existingModels));
  }
}
