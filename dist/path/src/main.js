import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiProvider, deserialize, serialize } from "wagmi";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from '@tanstack/react-query';
import { config } from "./wagmi.config.ts";
var queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
            retry: 0,
        },
        mutations: { networkMode: "offlineFirst" },
    },
});
var persister = createSyncStoragePersister({
    key: "vite-react.cache",
    serialize: serialize,
    storage: window.localStorage,
    deserialize: deserialize,
});
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
    <WagmiProvider config={config}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: persister }}>
        <App />
      </PersistQueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>);
