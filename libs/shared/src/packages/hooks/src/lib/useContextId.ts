import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
import { NoSelectedContextError } from '../../../error-boundary/src/classes/NoSelectedContextError';
/**
 * Hook that uses fusion-framework's `useModuleCurrentContext`
 * @returns A context id or undefined
 */
export const useContextId = () => {
  try {
    const { currentContext } = useModuleCurrentContext();
    if (!currentContext) {
      throw new NoSelectedContextError();
    }
    return currentContext?.id;
  } catch (e) {
    if (e instanceof NoSelectedContextError) {
      throw new NoSelectedContextError();
    }
    throw new Error(
      'UseModuleCurrentContext has to be called in the scope of Fusion framework with context enabled in config.'
    );
  }
};
