import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectPortalPage } from './pages/ProjectPortalPage';

const queryClient = new QueryClient();

export const App = () => (
  // <QueryClientProvider client={queryClient}>
  //   <ProjectPortalPage />;
  // </QueryClientProvider>
  <h1>Project Portal - Hello World!</h1>
);

export default App;
