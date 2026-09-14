import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from "./src/app/App"
import "./index.scss"

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.querySelector("#root")!)
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
)