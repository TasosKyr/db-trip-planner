import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "src/components/Layout";
import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import {
  FullPageErrorFallback,
  ErrorMessage,
} from "src/components/ErrorFallback/ErrorFallback";
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
