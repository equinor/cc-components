import { useFramework } from '@equinor/fusion-framework-react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { from, lastValueFrom, map, mergeMap, reduce, switchMap } from 'rxjs';
import {
  useCurrentUserInfo,
  RelationReturnType,
  Relations,
} from '@equinor/fusion-portal-react-utils';

type ID = { id: string };

/**
 * Custom hook to fetch user organization details based on the projects the user is part of.
 *
 * @param {boolean} [viewAll] - Optional flag to determine if all projects should be viewed or only active ones.
 * @returns {QueryObserverResult<RelationReturnType<'ProjectMaster'>[], Error>} - The query result containing the organization details.
 *
 * @remarks
 * This hook uses the current user's positions to filter and map the projects they are part of.
 * It then queries the context service to fetch organization details related to those projects.
 *
 * @example
 * const { data, error, isLoading } = useUserOrgDetails(true);
 *
 * @see useCurrentUser
 * @see useFramework
 * @see useMemo
 * @see useQuery
 */
export const useUserOrgDetails = (viewAll?: boolean) => {
  const { currentUserInfo } = useCurrentUserInfo();

  const serviceProvider = useFramework().modules.serviceDiscovery;

  // Get all projects the user is part of and filter out the ones that are not active
  const projects = useMemo(() => {
    return currentUserInfo?.positions
      ?.filter(
        (item) => viewAll || (item.appliesTo && new Date(item.appliesTo) > new Date())
      )
      .map((position) => position.project.id);
  }, [currentUserInfo, viewAll]);

  return useQuery<RelationReturnType<'ProjectMaster'>[], Error>({
    queryKey: ['pro-to-proM ', JSON.stringify(projects?.join), viewAll],
    queryFn: async () => {
      const contextClient = await serviceProvider.createClient('context');

      const userOrgDetails = contextClient
        .json$<ID[]>(
          `contexts/?$filter=type eq orgchart and (${projects
            ?.map((id) => `externalID eq ${id}`)
            .join(' or ')})`
        )
        .pipe(
          switchMap((contexts) =>
            from(contexts).pipe(
              mergeMap((context) =>
                contextClient
                  .json$<Relations[]>(`contexts/${context.id}/relations`)
                  .pipe(
                    map((contexts) =>
                      contexts.filter(
                        (context): context is RelationReturnType<'ProjectMaster'> =>
                          context.relationSource.includes('ProjectMaster')
                      )
                    )
                  )
              ),
              reduce(
                (acc, relations) =>
                  [...acc, ...relations].sort((i, o) => (i.title < o.title ? -1 : 1)),
                [] as RelationReturnType<'ProjectMaster'>[]
              )
            )
          )
        );
      return lastValueFrom(userOrgDetails);
    },
    enabled: Boolean(projects && projects?.length > 0),
    _defaulted: undefined,
  });
};
