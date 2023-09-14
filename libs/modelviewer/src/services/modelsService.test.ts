import { describe, test, expect, beforeAll, vi } from 'vitest';

import {
  AssetMetadataSimpleDto,
  Echo3dViewer,
  EchoSetupObject,
  ModelsClient,
} from '@equinor/echo-3d-viewer';
import { ModelService } from './modelsService';

import { CameraConfiguration, CogniteCadModel } from '@cognite/reveal';
import { Vector3 } from 'three';

const position = new Vector3(1, 2, 3);
const target = new Vector3(0, 0, 0);

const getCameraConfiguration = vi
  .fn()
  .mockImplementation(() => ({ position, target } as CameraConfiguration));

const loadModel = vi.fn().mockImplementation(
  () =>
    ({
      getCameraConfiguration,
      modelId: 123,
      setDefaultNodeAppearance: vi.fn(),
    } as unknown as CogniteCadModel)
);
const removeModel = vi.fn();

const modelsMeta = [
  {
    id: 123,
    plantCode: 'abc',
    platformSectionId: 'myABC',
  },
  {
    id: 456,
    plantCode: 'def',
    platformSectionId: 'myDEF',
  },
] as AssetMetadataSimpleDto[];

const listModels = vi.fn().mockImplementation(() => modelsMeta);

const modelApiClientMock = {
  listModels,
} as unknown as ModelsClient;

const viewerMock = {
  loadModel,
  removeModel,
  initializeFirstPersonControlsUsingModelAsBoundingBox: vi.fn(),
  initializeFirstPersonControlsUsingTarget: vi.fn(),
} as unknown as Echo3dViewer;

const localStorageMock = (() => {
  let store = {} as Record<string, string>;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeAll(() => {
  localStorageMock.clear();
});

describe('ModelService', async () => {
  const modelService = new ModelService({
    viewer: viewerMock,
    modelApiClient: modelApiClientMock,
  } as EchoSetupObject);

  test('should set local model', () => {
    const model = {
      plantCode: 'abc',
      platformSectionId: 'myABC',
    } as AssetMetadataSimpleDto;

    modelService.setLocalModel(model);
    expect(JSON.parse(localStorageMock.getItem('echoModelId'))).toEqual({ abc: 'myABC' });
  });
  test('should set append local model', () => {
    const model = {
      plantCode: 'abc',
      platformSectionId: 'myABC',
    } as AssetMetadataSimpleDto;

    const model2 = {
      plantCode: 'def',
      platformSectionId: 'myDEF',
    } as AssetMetadataSimpleDto;

    modelService.setLocalModel(model);
    modelService.setLocalModel(model2);
    expect(JSON.parse(localStorageMock.getItem('echoModelId'))).toEqual({
      abc: 'myABC',
      def: 'myDEF',
    });
  });
  test('should return model type', () => {
    const model = {
      plantCode: 'abc',
      platformSectionId: 'myABC',
    } as AssetMetadataSimpleDto;

    modelService.setLocalModel(model);
    const modelType = modelService.getLocalModel('abc');
    expect(modelType).toBe('myABC');
  });

  test('should return list of models with current plant code', async () => {
    const models = await modelService.getModelsForPlant('abc');

    expect(models.length).toBe(1);
    expect(models[0].plantCode).toBe('abc');
  });

  test('should load model by id in to viewer', async () => {
    const modelId = 123;
    const model = await modelService.loadModelById(modelId);

    expect(listModels).toBeCalled();
    expect(removeModel).not.toBeCalled();
    expect(model.id).toBe(modelId);
  });

  test('should update model meta observable', async () => {
    const modelId = 123;

    const model = await modelService.loadModelById(modelId);

    expect(model.id).toBe(modelId);
  });
});
