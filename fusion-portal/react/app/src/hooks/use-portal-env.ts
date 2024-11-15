import { useAppModule } from "@equinor/fusion-framework-react-app";
import { PortalAppConfig } from "@equinor/fusion-portal-module-app-config";

export const usePortalEnv = () => {
	const  portalAppConfig = useAppModule<PortalAppConfig>("portalAppConfig");
    return portalAppConfig.getPortalEnv();
}
