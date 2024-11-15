import { AppManifest } from './types/types';
export type { AppManifest } from './types/types';

export { FavoriteCard } from './components/FavoriteCard';
export { PortalCard } from './components/PortalCard';
export { ListCard } from './components/ListCard';

export type AppCardProps = {
	app: Partial<AppManifest>;
	onClick?: (app: Partial<AppManifest>) => void;
	loading?: boolean;
};
