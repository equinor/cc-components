import { useAppModule } from '@equinor/fusion-framework-react-app';
import { PortalMenuModule } from './module';
import { useObservableState } from '@equinor/fusion-observable/react';

export const usePortalMenu = () => {
  const menu = useAppModule<PortalMenuModule>('menu');

  if (!menu) {
    throw new Error('Menu module not found');
  }
  const { toggleMenu, closeMenu, setSearchText, state, state$ } = menu;
  const menuState = useObservableState(state$, { initial: state }).value;
  return {
    ...menuState,
    toggleMenu,
    closeMenu,
    setSearchText,
  };
};
