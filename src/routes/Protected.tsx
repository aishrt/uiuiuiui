import { Navigate, Outlet, Route } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import ErrorPage from "../pages/OtherPage/ErrorPage";
import Home from "../pages/Dashboard/Home";
import Blank from "../pages/Blank";
import Calendar from "../pages/Calendar";
import LineChart from "../pages/Charts/LineChart";
import FormElements from "../pages/Forms/FormElements";
import BarChart from "../pages/Charts/BarChart";
import Videos from "../pages/UiElements/Videos";
import Images from "../pages/UiElements/Images";
import Buttons from "../pages/UiElements/Buttons";
import Badges from "../pages/UiElements/Badges";
import Avatars from "../pages/UiElements/Avatars";
import Alerts from "../pages/UiElements/Alerts";
import BasicTables from "../pages/Tables/BasicTables";
import UserList from "../pages/AdminPages/UserList";
import AddUsers from "../pages/AdminPages/AddUsers";
import DealsList from "../pages/AdminPages/DealsList";
import TrucksList from "../pages/AdminPages/TrucksList";
import TransactionsList from "../pages/AdminPages/TransactionsList";
import CompanyList from "../pages/AdminPages/CompanyList";
import { useAuthStore } from "../store/authStore";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

// Define role types and constants
export type UserRole = 110 | 105 | 100 | 95 | 90 | 85 | 80 | 75;

export const ROLES = {
  superadmin: 110 as UserRole,
  admin: 105 as UserRole,
  organisation: 100 as UserRole,
  bookie: 95 as UserRole,
  trackie: 90 as UserRole,
  runner: 85 as UserRole,
  transporter: 80 as UserRole,
  clearing_agent: 75 as UserRole,
} as const;

// Role hierarchy check utility
const hasRequiredRole = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  return userRole >= requiredRole;
};

// Role Guard Component
interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallbackPath = "/not-found",
}) => {
  // TODO: Replace this with your actual auth context/state management
  const userRole = useAuthStore((state: any) => state.currentUserRole); // This should come from your auth system


  const hasAccess = allowedRoles.some((role) =>
    hasRequiredRole(userRole, role)
  );

  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

const ProtectedLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen alignmentLogo">Any Image Here</div>
      }
    >
      <ScrollToTop />
      <AppLayout />
    </Suspense>
  );
};

const ErrorLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen alignmentLogo">Any Image Here</div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin, ROLES.admin]}>
            <Home />
          </RoleGuard>
        ),
      },
      {
        path: "/profile",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin]}>
            <UserProfiles />
          </RoleGuard>
        ),
      },
      {
        path: "/user-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin , ROLES.admin]}>
            <UserList />
          </RoleGuard>
        ),
      },
      {
        path: "/admin-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin ]}>
            <UserList />
          </RoleGuard>
        ),
      },
      {
        path: "/organisation-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.admin]}>
            <CompanyList />
          </RoleGuard>
        ),
      },
      {
        path: "/deals-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.organisation]}>
            <DealsList />
          </RoleGuard>
        ),
      },
      {
        path: "/trucks-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.trackie]}>
            <TrucksList />
          </RoleGuard>
        ),
      },
      {
        path: "/transactions-list",
        element: (
          <RoleGuard allowedRoles={[ROLES.runner]}>
            <TransactionsList />
          </RoleGuard>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <RoleGuard allowedRoles={[ROLES.runner]}>
            <ResetPasswordForm />
          </RoleGuard>
        ),
      },
      {
        path: "/add-user",
        element: (
          <RoleGuard allowedRoles={[ROLES.admin]}>
            <AddUsers />
          </RoleGuard>
        ),
      },
      {
        path: "/edit-user/:id",
        element: (
          <RoleGuard allowedRoles={[ROLES.admin]}>
            <AddUsers />
          </RoleGuard>
        ),
      },
      {
        path: "/edit-company/:id",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin]}>
            <AddUsers />
          </RoleGuard>
        ),
      },
      {
        path: "/calendar",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin]}>
            <Calendar />
          </RoleGuard>
        ),
      },
      {
        path: "/blank",
        element: (
          <RoleGuard allowedRoles={[ROLES.superadmin]}>
            <Blank />
          </RoleGuard>
        ),
      },
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
