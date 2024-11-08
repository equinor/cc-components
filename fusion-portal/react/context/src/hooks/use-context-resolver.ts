import { QueryContextResponse } from '@equinor/fusion-framework-module-services/context/query';
import {
  ContextResolver,
  ContextResult,
  ContextResultItem,
} from '@equinor/fusion-react-context-selector';
import { useCallback } from 'react';

import { useContextProvider } from '@equinor/fusion-framework-react-app/context';

import { useContextClient } from './use-context-client';
import { clearLocalContext, getContextHistory } from '../configurators';

export const useContextResolver = (type: string[]): ContextResolver => {
  const contextProvider = useContextProvider();

  const client = useContextClient('json');
  const minQueryLength = 2;

  const searchQuery = useCallback(
    async (search: string): Promise<ContextResult> => {
      let searchResult: ContextResult = [];
      if (!client) {
        return [
          singleItem({
            title: 'Client Error',
            subTitle: 'No client provided to framework',
            isDisabled: true,
            isError: true,
          }),
        ];
      }

      try {
        if (!search || search.length < minQueryLength) {
          searchResult.push(
            singleItem({
              title: `Need ${minQueryLength - search.length} more chars`,
              isDisabled: true,
            })
          );
          return searchResult;
        }

        const contexts = await client.query('v1', {
          query: { search, filter: { type } },
        });

        if (contexts[0] && !contexts[0].id) return searchResult;
        // Structure as type

        searchResult =
          type.length > 1
            ? contextResultMappedByTypes(contexts)
            : contextResultMapped(contexts);

        if (searchResult.length === 0) {
          searchResult.push(singleItem({ title: 'No matches...', isDisabled: true }));
        }

        return searchResult;
      } catch (e) {
        return [
          singleItem({
            title: 'API Error',
            subTitle: e,
            isDisabled: true,
            isError: true,
          }),
        ];
      }
    },
    [client, type]
  );

  const children = getContextHistory(type);

  const historyItems = {
    id: 'history',
    title: 'History',
    type: 'section',
    children,
  };

  return {
    searchQuery,
    initialResult: children.length > 0 ? [singleItem(historyItems)] : [],
    closeHandler: (e: MouseEvent) => {
      e.stopPropagation();
      contextProvider.clearCurrentContext();
      clearLocalContext();
    },
  };
};

const singleItem = (props: unknown): ContextResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

function contextResultMappedByTypes(contexts: QueryContextResponse<'v1'>): ContextResult {
  return contexts.reduce((result, context) => {
    const index = result.findIndex((r) => r.title === context.type.id);
    if (index === -1) {
      result.push(
        singleItem({
          id: context.type.id,
          title: context.type.id,
          type: 'section',
          children: [
            singleItem({
              id: context.id,
              title: context.title || '',
              subTitle: context.type?.id,
            }),
          ],
        })
      );
      return result;
    }

    result[index].children?.push(
      singleItem({
        id: context.id,
        title: context.title || '',
        subTitle: context.type?.id,
      })
    );

    return result;
  }, [] as ContextResult);
}

function contextResultMapped(contexts: QueryContextResponse<'v1'>): ContextResult {
  return contexts.map((context) =>
    singleItem({
      id: context.id,
      title: context.title || '',
      subTitle: context.type?.id,
    })
  );
}
