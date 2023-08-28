import { describe, test, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { useError, useInfo, useWarning } from './useMessageBoundary';
import { MessageType } from '../type/general-types';

describe('useError', () => {
  test('Should set Error', () => {
    const message = 'This is a test Error';
    const { result } = renderHook(() => useError());
    act(() => {
      expect(() => result.current.setError(message)).toThrow(message);
    });
  });

  test('Should have error message', () => {
    const message = 'This is a test Error';
    const { result } = renderHook(() => useError());
    act(() => {
      expect(() => result.current.setError(message)).toThrow(message);
    });
    expect(result.current.errorMessage?.message).toBe(message);
  });
  test('Should have name Error', () => {
    const message = 'This is a test Error';
    const { result } = renderHook(() => useError());
    act(() => {
      expect(() => result.current.setError(message)).toThrow(message);
    });
    expect(result.current.errorMessage?.name).toBe('Error');
  });
  test('Should be MessageType error', () => {
    const message = 'This is a test Error';
    const { result } = renderHook(() => useError());
    act(() => {
      expect(() => result.current.setError(message)).toThrow(message);
    });
    expect(result.current.errorMessage?.type).toBe(MessageType.Error);
  });
});

describe('useInfo', () => {
  test('Should trow Info Message', () => {
    const message = 'This is a test Info';
    const { result } = renderHook(() => useInfo());
    act(() => {
      expect(() => result.current.setInfo(message)).toThrow(message);
    });
  });

  test('Should have info message', () => {
    const message = 'This is a test Info';
    const { result } = renderHook(() => useInfo());
    act(() => {
      expect(() => result.current.setInfo(message)).toThrow(message);
    });

    expect(result.current.infoMessage?.message).toBe(message);
  });
  test('Should have name Info', () => {
    const message = 'This is a test Info';
    const { result } = renderHook(() => useInfo());
    act(() => {
      expect(() => result.current.setInfo(message)).toThrow(message);
    });

    expect(result.current.infoMessage?.name).toBe('Message');
  });
  test('Should be MessageType info', () => {
    const message = 'This is a test Info';
    const { result } = renderHook(() => useInfo());
    act(() => {
      expect(() => result.current.setInfo(message)).toThrow(message);
    });

    expect(result.current.infoMessage?.type).toBe(MessageType.Info);
  });
});

describe('useWarning', () => {
  test('Should throw Warning', () => {
    const message = 'This is a test Warning';
    const { result } = renderHook(() => useWarning());
    act(() => {
      expect(() => result.current.setWarning(message)).toThrow(message);
    });
  });

  test('Should have error message', () => {
    const message = 'This is a test Warning';
    const { result } = renderHook(() => useWarning());
    act(() => {
      expect(() => result.current.setWarning(message)).toThrow(message);
    });
    expect(result.current.warningMessage?.message).toBe(message);
  });
  test('Should have name warning', () => {
    const message = 'This is a test Warning';
    const { result } = renderHook(() => useWarning());
    act(() => {
      expect(() => result.current.setWarning(message)).toThrow(message);
    });
    expect(result.current.warningMessage?.name).toBe('Message');
  });
  test('Should be MessageType warning', () => {
    const message = 'This is a test Warning';
    const { result } = renderHook(() => useWarning());
    act(() => {
      expect(() => result.current.setWarning(message)).toThrow(message);
    });
    expect(result.current.warningMessage?.type).toBe(MessageType.Warning);
  });
});
