import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 5 minutos de dados em cache antes de revalidar
      cacheTime: 1800000, // Cache mantido por 30 minutos
      refetchOnWindowFocus: false, // Evita refetch desnecessário ao focar na janela
    },
    mutations: {
      retry: 2, // Tentativas automáticas de retrabalho para falhas
    },
  },
});

export const ReactQueryClientProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
