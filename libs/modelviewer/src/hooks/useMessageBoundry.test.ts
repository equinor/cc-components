import { describe, test, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';

import { useError, useInfo, useWarning } from './useMessageBoundary';
import {
  ErrorMessage,
  InfoMessage,
  MessageType,
  WaringMessage,
} from '../type/general-types';

describe('useError', () => {
  test('Should have error message', () => {
    const message = 'This is a test Error';
    try {
      const { result } = renderHook(() => useError());
      act(() => {
        result.current.setError(message);
      });
      return result.current;
    } catch (error) {
      const errorMessage = error as ErrorMessage;
      expect(errorMessage.message).toBe(message);
    }
  });

  test('Should have name Error', () => {
    const message = 'This is a test Error';
    try {
      const { result } = renderHook(() => useError());
      act(() => {
        result.current.setError(message);
      });
      return result.current;
    } catch (error) {
      const errorMessage = error as ErrorMessage;
      expect(errorMessage.name).toBe('Error');
    }
  });
  test('Should be MessageType error', () => {
    const message = 'This is a test Error';
    try {
      const { result } = renderHook(() => useError());
      act(() => {
        result.current.setError(message);
        expect(() => useError()).toThrow();
      });
      return result.current;
    } catch (error) {
      const errorMessage = error as ErrorMessage;
      expect(errorMessage?.type).toBe(MessageType.Error);
    }
  });
});

describe('useInfo', () => {
  test('Should have info message', () => {
    const message = 'This is a test Info';
    try {
      const { result } = renderHook(() => useInfo());
      act(() => {
        result.current.setInfo(message);
      });
      return result.current;
    } catch (error) {
      const infoMessage = error as InfoMessage;
      expect(infoMessage.message).toBe(message);
    }
  });
  test('Should have name Message', () => {
    const message = 'This is a test Info';
    try {
      const { result } = renderHook(() => useInfo());
      act(() => {
        result.current.setInfo(message);
      });
      return result.current;
    } catch (error) {
      const infoMessage = error as InfoMessage;
      expect(infoMessage?.name).toBe('Message');
    }
  });
  test('Should be MessageType info', () => {
    const message = 'This is a test Info';
    try {
      const { result } = renderHook(() => useInfo());
      act(() => {
        result.current.setInfo(message);
      });
      return result.current;
    } catch (error) {
      const infoMessage = error as InfoMessage;
      expect(infoMessage?.type).toBe(MessageType.Info);
    }
  });
});

describe('useWarning', () => {
  test('Should have warn message', () => {
    const message = 'This is a test Warning';
    expect(() => {
      const { result } = renderHook(() => useWarning());
      act(() => {
        result.current.setWarning(message);
      });

      return result.current;
    }).toThrow(message);
  });

  test('Should have name warning', () => {
    const message = 'This is a test Warning';
    try {
      const { result } = renderHook(() => useWarning());
      act(() => {
        result.current.setWarning(message);
      });
      return result.current;
    } catch (error) {
      const warningMessage = error as WaringMessage;
      expect(warningMessage?.name).toBe('Message');
    }
  });
  test('Should be MessageType warning', () => {
    const message = 'This is a test Warning';
    try {
      const { result } = renderHook(() => useWarning());
      act(() => {
        result.current.setWarning(message);
      });
      return result.current;
    } catch (error) {
      const warningMessage = error as WaringMessage;
      expect(warningMessage?.type).toBe(MessageType.Warning);
    }
  });
});
