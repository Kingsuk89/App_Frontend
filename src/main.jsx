import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import router from "./router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className="dark:bg-slate-900 dark:text-white">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </QueryClientProvider>
);
