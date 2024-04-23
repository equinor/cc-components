import { HeatTrace } from '@cc-components/heattraceshared';
import { useResizeContext } from '@equinor/workspace-fusion';
import { useMemo, useRef } from 'react';
import { useGetWorkorders } from '../utils-sidesheet';
import { WorkorderTab } from '@cc-components/shared/sidesheet';
import {
  BaseStatus,
  ElectricalNetwork,
  LinkCell,
  StatusCircle,
  domainNames,
  hasProperty,
  statusColorMap,
  useContextId,
  useHttpClient,
} from '@cc-components/shared';
import {
  BannerItem,
  SidesheetHeader,
  SidesheetSkeleton,
  StyledBanner,
  StyledSideSheetContainer,
  Tabs,
} from '@cc-components/sharedcomponents';
import { ChecklistTab } from './ChecklistTab';
import { useGetHeatTraceChecklists } from '../utils-sidesheet/useGetChecklists';
import { useQuery } from '@tanstack/react-query';
import { CircuitDiagramTab } from './CircuitDiagramTab';
import { ModelViewerTab } from '@cc-components/modelviewer';
import { useGetEchoConfig } from '../utils-sidesheet/useGetEchoConfig';

const viewerOptions = {
  statusResolver: (status: string) => {
    return hasProperty(statusColorMap, status) ? statusColorMap[status] : '#009922';
  },
  defaultCroppingDistance: 3,
};

type HeatTraceProps = {
  id: string;
  item?: HeatTrace;
  close: () => void;
};

const HeattraceSidesheetComponent = (props: Required<HeatTraceProps>) => {
  const circuitDiagramTab = useCircuitDiagramTab(props.item);
  const workorderTab = useWorkorderTab(props.id);
  const checklistTab = useChecklistTab(props.id);
  const threeDTab = use3DTab(props.id);

  return (
    <StyledSideSheetContainer>
      <SidesheetHeader
        title={props.item.heatTraceCableNo}
        url={props.item.heatTraceCableUrl ?? ''}
        description={props.item.heatTraceCableDescription || ''}
        onClose={props.close}
        applicationTitle="Heat Trace"
      />
      <StyledBanner>
        <BannerItem
          title={domainNames.checklistStatus}
          value={
            <StatusCircle
              content={props?.item?.formStatus || 'N/A'}
              statusColor={
                props?.item?.formStatus
                  ? statusColorMap[props.item.formStatus as BaseStatus]
                  : 'transparent'
              }
            />
          }
        />
        <BannerItem
          title={domainNames.commPkg}
          value={
            props.item.commissioningPackageNo ? (
              <LinkCell
                url={props.item.commissioningPackageUrl ?? ''}
                urlText={props.item.commissioningPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title={domainNames.mcPkg}
          value={
            props.item.mechanicalCompletionPackageNo ? (
              <LinkCell
                url={props.item.mechanicalCompletionUrl ?? ''}
                urlText={props.item.mechanicalCompletionPackageNo}
              />
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title={domainNames.commPriority1}
          value={props.item.priority1 ?? 'N/A'}
        />
      </StyledBanner>
      <Tabs tabs={[circuitDiagramTab, workorderTab, checklistTab, threeDTab]}></Tabs>
    </StyledSideSheetContainer>
  );
};

export function HeattraceSidesheet({ id, item, close }: HeatTraceProps) {
  const client = useHttpClient();
  const contextId = useContextId();

  const {
    data: heatTrace,
    error,
    isLoading: isLoadingSidesheet,
  } = useQuery<HeatTrace>(
    ['heat-trace', id],
    async () => {
      const res = await client.fetch(`/api/contexts/${contextId}/heat-trace/${id}`);
      if (!res.ok) throw res;
      return res.json();
    },
    {
      suspense: false,
      initialData: item ?? undefined,
      useErrorBoundary: false,
    }
  );

  const {
    data: modelConfig,
    tagsOverlay,
    isFetching: isFetchingModelConfig,
    error: modelConfigError,
  } = useGetEchoConfig(id);

  if (isLoadingSidesheet) {
    return <SidesheetSkeleton close={close} />;
  }

  if (!heatTrace || error) {
    return <div>Failed to get Heat Trace with id: {id}</div>;
  }

  return <HeattraceSidesheetComponent id={id} item={heatTrace} close={close} />;
}

const useCircuitDiagramTab = (ht: HeatTrace) => {
  const client = useHttpClient();
  const contextId = useContextId();
  const { width, setWidth } = useResizeContext();
  const reszied = useRef({ hasResized: false, id: ht.heatTraceCableId });
  if (reszied.current.id !== ht.heatTraceCableId) {
    reszied.current = { hasResized: false, id: ht.heatTraceCableId };
    setWidth(700);
  }

  const {
    data: elenetwork,
    isLoading: isLoadingEle,
    error: errorEle,
  } = useQuery<ElectricalNetwork | null>(
    /**Change facility to project */
    /** facility*/[ht.heatTraceCableNo, ht.facility, ht.project],
    async ({ signal }) => {
      const res = await client.fetch(
        `api/contexts/${contextId}/electrical/electrical-network/${encodeURIComponent(
          ht.heatTraceCableNo
        )}/${ht.facility}`,
        { signal }
      );

      if (res.status === 204) {
        return null;
      }

      if (!res.ok) {
        if (res.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch elenetwork');
      }
      return res.json();
    },
    {
      suspense: false,
      useErrorBoundary: false,
    }
  );

  const tab = useMemo(() => {
    return {
      tabTitle: 'Circuit diagram',
      tabContent: (
        <CircuitDiagramTab
          elenetwork={elenetwork}
          itemNo={ht.heatTraceCableNo}
          onCircuitDiagramReady={(element) => {
            if (reszied.current.hasResized) return;
            const newWidth = element.scrollWidth;
            if (width !== 700) return;
            setWidth(newWidth + 50);
            reszied.current = { hasResized: true, id: ht.heatTraceCableId };
          }}
        />
      ),
    };
  }, [elenetwork, errorEle, isLoadingEle]);
  return tab;
};

const useWorkorderTab = (htId: string) => {
  const { dataWorkorders, errorWorkorders, isLoadingWorkorders } = useGetWorkorders(
    htId ?? ''
  );
  const tab = useMemo(() => {
    return {
      tabTitle: `Work orders (${dataWorkorders ? dataWorkorders?.length : '...'})`,
      tabContent: (
        <WorkorderTab
          error={errorWorkorders}
          isFetching={isLoadingWorkorders}
          workorders={dataWorkorders}
        />
      ),
    };
  }, [dataWorkorders, errorWorkorders, isLoadingWorkorders]);
  return tab;
};

const useChecklistTab = (htId: string) => {
  const { dataChecklists, errorChecklists, isLoadingChecklists } =
    useGetHeatTraceChecklists(htId ?? '');
  const tab = useMemo(() => {
    return {
      tabTitle: `Checklists (${dataChecklists ? dataChecklists?.length : '...'})`,
      tabContent: (
        <ChecklistTab
          error={errorChecklists}
          isFetching={isLoadingChecklists}
          checklists={dataChecklists}
        />
      ),
    };
  }, [dataChecklists, errorChecklists, isLoadingChecklists]);
  return tab;
};

const use3DTab = (htId?: string) => {
  return {
    tabTitle: '3D',
    tabContent: <>3D is coming</>,
  };
};
