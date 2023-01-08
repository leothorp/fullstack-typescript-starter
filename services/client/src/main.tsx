import React from "react";
import ReactDOM from "react-dom/client";
import "flowbite";
import App from "./App";
import "./styles/main.css";
import { trpcReactClient, trpc, queryClient } from "@client/store/auth";
import { Router } from "react-router";
import browserHistory from "@client/utils/browserHistory";
import { QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <trpc.Provider client={trpcReactClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router history={browserHistory}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}
