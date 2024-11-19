import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './components/app-router/AppRouter';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
);

export default App;
