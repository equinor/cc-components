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

  const data = {
    hierarchyClientBaseUrl: args.env.config?.environment.hierarchyClientBaseUrl as string,
    hierarchyClientScope: args.env.config?.environment.hierarchyClientScope as string,
    modelClientBaseUrl: args.env.config?.environment.modelClientBaseUrl as string,
    modelClientScope: args.env.config?.environment.modelClientScope as string,
    echoClientBaseUrl: args.env.config?.environment.echoClientBaseUrl as string,
    echoClientScope: args.env.config?.environment.echoClientScope as string,
  };

  return (
    <ModelViewerConfigContext.Provider value={data}>
      {children}
    </ModelViewerConfigContext.Provider>
  );
};
