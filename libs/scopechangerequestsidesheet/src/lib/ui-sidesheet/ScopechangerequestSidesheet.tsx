import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { Tabs } from '@equinor/eds-core-react';
import { createWidget } from '@cc-components/shared';
import { useRef, useState } from 'react';
import { RequestTab } from './tabs/RequestTab';
import { StyledTabListWrapper, StyledTabsList } from './sidesheet.styles';
import { useQuery } from '@tanstack/react-query';
import { LinkCell, useContextId, useHttpClient } from '@cc-components/shared';
import { WorkorderTab } from '@cc-components/shared/sidesheet';

import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledPanels,
  StyledSideSheetContainer,
  StyledTabs,
} from '@cc-components/sharedcomponents';
import { useGetWorkorders } from '../utils-sidesheet/useGetWorkorders';
import { useGetHistory } from '../utils-sidesheet/useGetHistory';
import { Logtab } from './tabs/LogTab';

export const ScopechangerequestSidesheet = createWidget<ScopeChangeRequest>(
  ({ props }) => {
    const [activeTab, setActiveTab] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const handleChange = (index: number) => {
      setActiveTab(index);
      ref.current && ref.current.scrollTo({ left: index ** index });
    };
    const client = useHttpClient();
    const contextId = useContextId();
    const { dataWorkorders, errorWorkorders, isLoadingWorkorders } = useGetWorkorders(
      props.id ?? ''
    );
    const { dataHistory, errorHistory, isLoadingHistory } = useGetHistory(props.id ?? '');
    const {
      data: scopechange,
      error,
      isLoading: isLoadingSidesheet,
    } = useQuery(
      ['scopechange', props.id],
      async () => {
        const res = await client.fetch(`/api/scope-change-requests/${props.id}`, {
          headers: { ['x-fusion-context-id']: contextId },
        });
        if (!res.ok) throw res;
        return res.json() as Promise<ScopeChangeRequest>;
      },
      {
        suspense: false,
        initialData: props.item ?? undefined,
        useErrorBoundary: false,
      }
    );

    if (isLoadingSidesheet) {
      return <SidesheetSkeleton close={props.closeSidesheet} />;
    }

    if (!scopechange || error) {
      return <div>Failed to get Scope Change Request with id: {props.id}</div>;
    }

    return (
      <StyledSideSheetContainer>
        <SidesheetHeader
          title={scopechange.serialNumber + ' - ' + scopechange.title || ''}
          applicationTitle={'Scope Change Request'}
          onClose={props.closeSidesheet}
        />
        <StyledBanner>
          <BannerItem
            title="Phase"
            value={
              !scopechange.phase ? (
                ''
              ) : (
                <LinkCell url={scopechange.phase} urlText={scopechange.phase} />
              )
            }
          />
          <BannerItem
            title="Change Category"
            value={
              !scopechange.changeCategory ? (
                ''
              ) : (
                <LinkCell
                  url={scopechange.changeCategory.name}
                  urlText={scopechange.changeCategory.name}
                />
              )
            }
          />
          <BannerItem
            title="Scope"
            value={
              !scopechange.scope ? (
                ''
              ) : (
                <LinkCell url={scopechange.scope.name} urlText={scopechange.scope.name} />
              )
            }
          />
          <BannerItem
            title="State"
            value={
              !scopechange.state ? (
                ''
              ) : (
                <LinkCell url={scopechange.state} urlText={scopechange.state} />
              )
            }
          />
        </StyledBanner>
        <StyledTabs activeTab={activeTab} onChange={handleChange}>
          <StyledTabListWrapper>
            <StyledTabsList ref={ref}>
              <Tabs.Tab>Request </Tabs.Tab>
              <Tabs.Tab>Work orders</Tabs.Tab>
              <Tabs.Tab>Logs</Tabs.Tab>
            </StyledTabsList>
          </StyledTabListWrapper>

          <StyledPanels>
            <Tabs.Panel>
              <RequestTab scopechange={scopechange} />
            </Tabs.Panel>
            <Tabs.Panel>
              <WorkorderTab
                isFetching={isLoadingWorkorders}
                error={errorWorkorders}
                workorders={dataWorkorders}
              />
            </Tabs.Panel>
            <Tabs.Panel>
              <Logtab logEntry={dataHistory} />
            </Tabs.Panel>
          </StyledPanels>
        </StyledTabs>
      </StyledSideSheetContainer>
    );
  }
);

export default ScopechangerequestSidesheet.render;
