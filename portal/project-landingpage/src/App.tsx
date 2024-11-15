import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './components/app-router/AppRouter';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import { ContextModule } from '@equinor/fusion-framework-module-context';



const queryClient = new QueryClient();

export const App = () => (
	<QueryClientProvider client={queryClient}>
		<AppRouter />
	</QueryClientProvider>
);

export default App;
