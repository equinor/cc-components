import { createWidget as createResizableSidesheet } from '@equinor/workspace-sidesheet';
import { useCloseSidesheetOnContextChange } from '../../../hooks';
import { PropsWithChildren } from 'react';

type BaseProps<T> = {
  id: string;
  item?: T;
  closeSidesheet: VoidFunction;
};

export function createWidget<T>(
  Comp: (props: { props: BaseProps<T> }) => JSX.Element,
  resizeOptions?: {
    defaultWidth?: number | undefined;
  }
) {
  return createResizableSidesheet(
    (props: { props: BaseProps<T> }) => (
      <SidesheetWrapper closeSidesheet={props.props.closeSidesheet}>
        <Comp props={props.props} />
      </SidesheetWrapper>
    ),
    resizeOptions
  );
}

export function SidesheetWrapper<T>({
  closeSidesheet,
  children,
}: PropsWithChildren<{ closeSidesheet: VoidFunction }>) {
  useCloseSidesheetOnContextChange(closeSidesheet);

  return <>{children}</>;
}
