import { ContextItem, ContextModule } from '@equinor/fusion-framework-module-context';
import {  useAppModules
} from '@equinor/fusion-framework-react-app';
import { useObservableState } from '@equinor/fusion-observable/react';


export const useCurrentContext = <TType extends Record<string, unknown>>() => {

	const modules = useAppModules<[ContextModule]>();
	if (!modules.context) {
		throw new Error('Context module is not loaded');
	}
	const currentContext = useObservableState( modules.context?.currentContext$).value;

	return currentContext as ContextItem<TType> | undefined;
};
