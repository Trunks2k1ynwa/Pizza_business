import { memo } from 'react';
import Routes from './routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SkeletonTheme } from 'react-loading-skeleton';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <Routes />
        <ToastContainer></ToastContainer>
        <ReactQueryDevtools initialIsOpen={true} />
      </SkeletonTheme>
    </QueryClientProvider>
  );
};
export default memo(App);
