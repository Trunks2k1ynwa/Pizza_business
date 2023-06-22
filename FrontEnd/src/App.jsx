import { memo } from 'react';
import Routes from './routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      <Routes />
      <ToastContainer></ToastContainer>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
export default memo(App);
