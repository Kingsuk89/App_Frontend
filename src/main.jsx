import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "./index.css";
import router from "./router.jsx";
import store from "./app/store.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <div className="dark:bg-slate-900 dark:text-white">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  </Provider>
);
