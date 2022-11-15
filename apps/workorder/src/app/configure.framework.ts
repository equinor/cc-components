import { FusionConfigurator } from '@equinor/fusion-framework-react';
import { configureAgGrid } from '@equinor/fusion-framework-module-ag-grid';
import { enableServices } from '@equinor/fusion-framework-module-services';
export const configure = async (config: FusionConfigurator) => {
  // config.configureServiceDiscovery({
  //   client: {
  //     baseUri: 'https://famapi.equinor.com',
  //     defaultScopes: ['api://958bef40-48c3-496e-bc0b-0fe5783f196b/access_as_user'],
  //   },
  // });

  config.configureServiceDiscovery({
    client: {
      baseUri: 'https://pro-s-portal-ci.azurewebsites.net/',

      defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
    },
  });

  config.configureMsal(
    {
      tenantId: '3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
      clientId: '922fbdee-795d-4733-b4ab-e1cc8bf85e8c',
      redirectUri: '/authentication/login-callback',
    },
    { requiresAuth: true }
  );

  config.addConfig(
    configureAgGrid({
      licenseKey:
        'CompanyName=Equinor ASA,LicensedGroup=Fusion,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=20,LicensedProductionInstancesCount=2,AssetReference=AG-026689,ExpiryDate=2_May_2023_[v2]_MTY4Mjk4MjAwMDAwMA==ca75ae051394e34c20407e0a3285ee58',
    })
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  enableServices(config);
};

export default configure;
