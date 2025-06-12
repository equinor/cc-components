export const isAffiliateUser = () => {
  return !window.Fusion.modules.auth.defaultAccount?.username.endsWith('@equinor.com');
};
