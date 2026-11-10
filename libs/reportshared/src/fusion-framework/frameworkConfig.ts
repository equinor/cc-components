import { IAppConfigurator } from '@equinor/fusion-framework-react-app';
import { enableBookmark } from '@equinor/fusion-framework-react-app/bookmark';
import { enableAppState } from '@equinor/fusion-framework-react-app/state';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';

export const configure = (contextTypes: string[]) => async (config: IAppConfigurator) => {
  enableBookmark(config);
  enableAppState(config);
  enableContext(config as any, async (builder) => {
    builder.setContextType(contextTypes);
    builder.setContextParameterFn(({ search, type }) => {
      return buildQuery({
        search,
        filter: {
          type: {
            in: type,
          },
        },
      });
    });
  });
  // Add more config if needed, e.g. enableAgGrid
};
