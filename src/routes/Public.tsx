import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "../pages/OtherPage/NotFound";
import Home from "../pages/Dashboard/Home";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import ErrorPage from "../pages/OtherPage/ErrorPage";
import { ScrollToTop } from "../components/common/ScrollToTop";
import Landing from "../pages/Dashboard/Landing";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import UpdatePasswordForm from "../components/auth/UpdatePasswordForm";
import UpdatePassword from "../pages/AuthPages/UpdatePassword";
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="w-screen h-screen alignmentLogo">Any Image Here</div>
        }
      >
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/home", element: <Landing /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/update-password/:token",
        element: <UpdatePassword />,
      },
      { path: "/error", element: <ErrorPage /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODE4ZTY3YTk4ZDE3NDVkMzkyY2ViOTgiLCJyb2xlIjoiNjgxOGRlZmEyM2YxNmNjMDc4MGUzZDg3IiwiaWF0IjoxNzQ3MDMzNDkyLCJleHAiOjE3NDcwMzQwOTIsInR5cGUiOiJyZXNldFBhc3N3b3JkIn0.hGvf3CpkodspXLxLAW7ynNc5Z1cZVMxG3z9LWbAaRXI