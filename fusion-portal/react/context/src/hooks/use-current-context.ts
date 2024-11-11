import { ContextItem } from '@equinor/fusion-framework-module-context';
import { useContextProvider } from '@equinor/fusion-framework-react-app/context';
import { useObservableState } from '@equinor/fusion-observable/react';

export const useCurrentContext = <TType extends Record<string, unknown>>() => {
	const provider = useContextProvider();
	const currentContext = useObservableState(provider.currentContext$).value;

	return currentContext as ContextItem<TType> | undefined;
};
