import { Icon } from '@equinor/eds-core-react';
import { warning_outlined, light, thermostat, battery } from '@equinor/eds-icons';
import { forwardRef, ReactNode } from 'react';
import { ElectricalNetwork } from '../types';
import {
  StyledSwitchboardWrapper,
  StyledCircuitNameAndIconWrapper,
  StyledCircuitNameAndIcon,
  StyledHTCable,
  StyledSpaceHeater,
  StyledNetworkNameAndIcon,
  StyledCable,
  StyledJunctionBox,
  StyledFirstItem,
  StyledItem,
  StyledDefaultComponent,
} from './stylesCircuitDiagram';
import { Skeleton } from '@cc-components/sharedcomponents';
import {
  SpaceHeaterIcon,
  MissingCable,
  ElectricalOutletIcon,
  PanelIcon,
  MotorIcon,
  SwitchIcon,
  InstrumentIcon,
  TransformerIcon,
  UnknownIcon,
  TagMccrStatus,
} from './Icons';
import { colorMap } from '../../mapping';
import { PackageStatus } from '../../types';

Icon.add({ warning_outlined, light, thermostat, battery });

export type CircuitRef = Record<string, HTMLDivElement>;

export function Switchboard({
  network,
  circuitRef,
}: {
  network: ElectricalNetwork;
  circuitRef: CircuitRef;
}) {
  return (
    <StyledSwitchboardWrapper>
      <StyledNetworkNameAndIcon>
        {network.name}
        <TagMccrStatus
          mccrStatus={network.mccrStatus || 'No status'}
          mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
        />
      </StyledNetworkNameAndIcon>
      {network.children.map((circuit) => {
        const maybeRef = circuitRef?.[circuit.name];
        return (
          <StyledCircuitNameAndIconWrapper key={circuit.name} maybeRef={maybeRef}>
            <StyledCircuitNameAndIcon key={circuit.name} style={{ minWidth: '76px' }}>
              {circuit.name}
              <TagMccrStatus
                mccrStatus={circuit.mccrStatus || 'No status'}
                mccrColor={colorMap[(circuit.mccrStatus || 'No status') as PackageStatus]}
              />
            </StyledCircuitNameAndIcon>
          </StyledCircuitNameAndIconWrapper>
        );
      })}
    </StyledSwitchboardWrapper>
  );
}

export function HTCable({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledHTCable backgroundColor={backgroundColor}>
      {network.name}
      <TagMccrStatus
        mccrStatus={network.mccrStatus || 'No status'}
        mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
      />
    </StyledHTCable>
  );
}

export function SpaceHeater({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledSpaceHeater backgroundColor={backgroundColor}>
      {network.name}
      <SpaceHeaterIcon />
      <TagMccrStatus
        mccrStatus={network.mccrStatus || 'No status'}
        mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
      />
    </StyledSpaceHeater>
  );
}

export function Cable({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledCable backgroundColor={backgroundColor}>
      {network.name}
      <TagMccrStatus
        mccrStatus={network.mccrStatus || 'No status'}
        mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
      />
    </StyledCable>
  );
}

export function JunctionBox({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <>
      {network.missingCable ? <MissingCable /> : null}
      <StyledJunctionBox backgroundColor={backgroundColor}>
        {network.name}
        <TagMccrStatus
          mccrStatus={network.mccrStatus || 'No status'}
          mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
        />
      </StyledJunctionBox>
    </>
  );
}

export function Light({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon name={light.name} height={21} width={21} title="Light"></Icon>
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function ElectricalOutlet({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <ElectricalOutletIcon />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function ControlPanel({
  network,
  backgroundColor,
  popoverText,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
  popoverText: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <PanelIcon popoverText={popoverText} />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Motor({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <MotorIcon />{' '}
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Switch({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <SwitchIcon />{' '}
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Thermostat({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon name={thermostat.name} height={21} width={21} title="Thermostat" />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Battery({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name}
          <Icon name={battery.name} height={21} width={21} title="Battery" />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Instrument({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <InstrumentIcon />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Transformer({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <TransformerIcon />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Board({
  network,
  backgroundColor,
  popoverText,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
  popoverText: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <PanelIcon popoverText={popoverText} />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export function Unknown({
  network,
  backgroundColor,
}: {
  network: ElectricalNetwork;
  backgroundColor: string;
}) {
  return (
    <StyledItem backgroundColor={backgroundColor}>
      <StyledDefaultComponent>
        <StyledNetworkNameAndIcon>
          {network.name} <UnknownIcon />
          <TagMccrStatus
            mccrStatus={network.mccrStatus || 'No status'}
            mccrColor={colorMap[(network.mccrStatus || 'No status') as PackageStatus]}
          />
        </StyledNetworkNameAndIcon>
      </StyledDefaultComponent>
    </StyledItem>
  );
}

export const MaybeFirst = forwardRef<
  HTMLDivElement,
  { circuitName: string | null; children: ReactNode }
>(({ circuitName, children }, ref) => (
  <>
    {circuitName ? (
      <StyledFirstItem ref={ref}>{children}</StyledFirstItem>
    ) : (
      <StyledItem>{children}</StyledItem>
    )}
  </>
));

export function CircuitDiagramSkeleton() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '10px',
      }}
    >
      <Skeleton height="150px" width="110px" />
      <Skeleton height="15px" width="110px" />
      <Skeleton height="100px" width="50px" />
      <div
        style={{
          display: 'flex',
          height: '100px',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
      >
        <Skeleton height="15px" width="110px" />
        <Skeleton height="15px" width="110px" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Skeleton height="50px" width="50px" />
        <Skeleton height="50px" width="50px" />
      </div>
    </div>
  );
}
