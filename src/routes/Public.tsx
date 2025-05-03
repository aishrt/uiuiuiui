import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import NotFound from '../pages/OtherPage/NotFound';
import Home from '../pages/Dashboard/Home';
import SignIn from '../pages/AuthPages/SignIn';
import SignUp from '../pages/AuthPages/SignUp';
import ErrorPage from '../pages/OtherPage/ErrorPage';
import { ScrollToTop } from '../components/common/ScrollToTop';

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/error', element: <ErrorPage /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <Navigate to="/not-found" /> },
    ],
  },
];

