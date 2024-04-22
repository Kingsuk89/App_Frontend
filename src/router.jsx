/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./components/home/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Verify = lazy(() => import("./components/auth/Verify"));
const RestForm = lazy(() => import("./components/auth/RestForm"));
const ResetPass = lazy(() => import("./components/auth/ResetPass"));
const Profile = lazy(() => import("./components/user/Profile"));
const Protected = lazy(() => import("./components/utils/Protected"));
const Error = lazy(() => import("./components/Error"));
const Gallery = lazy(() => import("./components/gallery/Gallery"));
const AdminProtector = lazy(() => import("./components/admin/AdminProtector"));
const Admin = lazy(() => import("./components/admin/Admin"));
import Loader from "./components/utils/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loader />}>
            <Protected>
              <Profile />
            </Protected>
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense fallback={<Loader />}>
            <Protected>
              <Gallery />
            </Protected>
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loader />}>
            <Protected>
              <AdminProtector>
                <Admin />
              </AdminProtector>
            </Protected>
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",

    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/signUp",
    element: (
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/verify/:email",
    element: (
      <Suspense fallback={<Loader />}>
        <Verify />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/reset-form",
    element: (
      <Suspense fallback={<Loader />}>
        <RestForm />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/reset/:email",
    element: (
      <Suspense fallback={<Loader />}>
        <ResetPass />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <Error />
      </Suspense>
    ),
  },
]);

export default router;
