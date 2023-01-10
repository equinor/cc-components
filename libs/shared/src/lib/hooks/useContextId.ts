import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
export const useContextId = () => {
  try {
    const { currentContext } = useModuleCurrentContext();
    return currentContext?.id;
  } catch {
    throw new Error(
      'UseModuleCurrentContext has to be called in the scope of Fusion framework with context enabled in config.'
    );
  }
};
