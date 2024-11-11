import { useContextProvider } from '@equinor/fusion-framework-react-app/context';
import FusionContextSelector, { ContextResult, ContextSelectEvent } from '@equinor/fusion-react-context-selector';
import { NavigateFunction } from 'react-router-dom';

interface ContextSelectorProps {
	variant?: string;
	navigate?: NavigateFunction;
}

export const ContextSelector = ({ variant }: ContextSelectorProps) => {
	const contextProvider = useContextProvider();

	return (
		<FusionContextSelector
			id="context-selector"
			variant={variant}
			onSelect={(e: ContextSelectEvent) => {
				e.stopPropagation();
				// sins this is a single select the will be the next context at index 0
				const context = (e.nativeEvent.detail.selected as ContextResult)[0];
				contextProvider.contextClient.setCurrentContext(context.id);
			}}
			value={contextProvider.currentContext?.id ? contextProvider.currentContext?.title || '' : ''}
			placeholder="Start to type to search..."
			selectTextOnFocus={true}
		/>
	);
};
