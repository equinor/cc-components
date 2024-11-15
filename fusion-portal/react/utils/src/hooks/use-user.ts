import { useFramework } from "@equinor/fusion-framework-react-app/framework";
import { useQuery } from "@tanstack/react-query";
import { PersonDetails } from "../types";
import { getUserInfo } from "../queries";

export const useUser = (azureId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('people');
	return useQuery<PersonDetails, Error>({
		queryKey: ['user-info', azureId],
		queryFn: async () => getUserInfo(await client, azureId),
		enabled: Boolean(azureId),
	});
};
