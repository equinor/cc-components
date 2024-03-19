import { ComponentRenderArgs } from '@equinor/fusion-framework-react-app';
import { PropsWithChildren, createContext, useContext } from 'react';

interface ModelViewerConfigContextState {
  hierarchyClientBaseUrl: string;
  hierarchyClientScope: string;
  modelClientBaseUrl: string;
  modelClientScope: string;
  echoClientBaseUrl: string;
  echoClientScope: string;
}

const ModelViewerConfigContext = createContext({} as ModelViewerConfigContextState);

export const useModelViewerConfig = () => {
  const context = useContext(ModelViewerConfigContext);

  // Verify that all required props are provided
  const isAllPropsProvided = Object.values(context).every((x) => Boolean(x));

  if (!isAllPropsProvided) {
    throw Error('Some ModelViewer environment variables is missing');
  }

  return context;
};

type Props = {
  args: ComponentRenderArgs;
} & PropsWithChildren;

export const ModelViewerConfigProvider = (props: Props) => {
  const { args, children } = props;

  const config = args.env.config.environment.modelViewerConfig;

  const data = {
    hierarchyClientBaseUrl: config.hierarchyClientBaseUrl as string,
    hierarchyClientScope: config.hierarchyClientScope as string,
    modelClientBaseUrl: config.modelClientBaseUrl as string,
    modelClientScope: config.modelClientScope as string,
    echoClientBaseUrl: config.echoClientBaseUrl as string,
    echoClientScope: config.echoClientScope as string,
  };

  return (
    <ModelViewerConfigContext.Provider value={data}>
      {children}
    </ModelViewerConfigContext.Provider>
  );
};
