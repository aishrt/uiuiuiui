import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import ErrorPage from "../pages/OtherPage/ErrorPage";
// import { useAuthStore } from "../store/authStore";

const ProtectedLayout = () => {
  // const { isAuthenticated } = useAuthStore();

  // if (!isAuthenticated) {
  //   return <Navigate to="/signin" replace />;
  // }

  return (
    <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
      <ScrollToTop />
      <AppLayout />
    </Suspense>
  );
};

const ErrorLayout = () => {
  return (
    <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <UserProfiles /> },
      { path: "/myProfile", element: <UserProfiles /> },
    ],
  },
  {
    path: "/",
    element: <ErrorLayout />,
    children: [
      { path: "/not-found", element: <NotFound /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
