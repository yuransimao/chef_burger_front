
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Com SSR, geralmente queremos definir um staleTime padrão
            // acima de 0 para evitar refetching imediato no cliente
            staleTime: 60 * 1000, // 1 minuto
            retry: 3,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
      {/*{process.env.NODE_ENV === 'development' && (
        //<ReactQueryDevtools initialIsOpen={false} />
      )}*/}
    </QueryClientProvider>
  )
}