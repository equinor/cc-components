export const getFusionPortalURL = (env: string) => {
  switch (env.toLowerCase()) {
    case 'fprd':
      return 'https://fusion.equinor.com';
    case 'ci':
      return 'https://fusion.ci.fusion-dev.net';
    case 'fqa':
      return 'https://fusion.fqa.fusion-dev.net';
    default:
      return 'https://fusion.equinor.com';
  }
};
