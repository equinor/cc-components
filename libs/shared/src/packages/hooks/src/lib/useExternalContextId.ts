import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
/**
 * Hook that uses fusion-framework's `useModuleCurrentContext`
 * @returns A context id or undefined
 */
export const useExternalContextId = () => {
  try {
    const { currentContext } = useModuleCurrentContext();
    return currentContext?.externalId;
  } catch {
    throw new Error(
      'UseModuleCurrentContext has to be called in the scope of Fusion framework with context enabled in config.'
    );
  }
};
