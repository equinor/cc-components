export const isAffiliateUser = () => {
  return !window.Fusion.modules.auth.account?.username.endsWith('@equinor.com');
};
