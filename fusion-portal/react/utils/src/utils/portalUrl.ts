// Todo useAppModule PortalApp env
export const getFusionPortalURL = () => {
  switch (window._config_?.fusionLegacyEnvIdentifier?.toLowerCase()) {
    case 'fprd':
      return 'https://fusion.equinor.com';
    case 'ci':
      return 'https://fusion-s-portal-ci.azurewebsites.net';
    case 'fqa':
      return 'https://fusion-s-portal-fqa.azurewebsites.net';
    default:
      return 'https://fusion-s-portal-ci.azurewebsites.net';
  }
};

declare global {
  interface Window {
    _config_: {
      fusionLegacyEnvIdentifier: string;
    };
  }
}
