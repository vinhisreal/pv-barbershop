import type { RouteObject } from 'react-router';

import Cookie from 'js-cookie';
import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BaberDashboardPage = lazy(() => import('src/pages/baber-dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ServicePage = lazy(() => import('src/pages/service'));
export const FooterPage = lazy(() => import('src/pages/footer'));
export const LookbookPage = lazy(() => import('src/pages/lookbook'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const AppointmentPage = lazy(() => import('src/pages/appointment'));
export const TodaySchedulePage = lazy(() => import('src/pages/today'));
export const PaymentPage = lazy(() => import('src/pages/payment'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const GeneralPage = lazy(() => import('src/pages/general'));
export const GiftPage = lazy(() => import('src/pages/gift'));
export const InvoicePage = lazy(() => import('src/pages/invoice'));
export const ReviewPage = lazy(() => import('src/pages/review'));
export const RedemptionPage = lazy(() => import('src/pages/redemption'));
export const DiscountPage = lazy(() => import('src/pages/discount'));
export const SalaryPage = lazy(() => import('src/pages/salary'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ThankYouPage = lazy(() => import('src/pages/thankyou'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
const userRole = Cookie.get('user_role_name');

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const receptionistLoader = () => {
  if (userRole !== 'receptionist') {
    return redirect('/404');
  }
  return null;
};

const resceptionistOrAdminLoader = () => {
  if (userRole !== 'receptionist' && userRole !== 'admin') {
    return redirect('/404');
  }
  return null;
};

const staffLoader = () => {
  if (userRole !== 'staff') {
    return redirect('/404');
  }
  return null;
};

const adminLoader = () => {
  if (userRole !== 'admin') {
    return redirect('/404');
  }
  return null;
};

const internalLoader = () => {
  if (!userRole) {
    return redirect('/sign-in');
  }
  if (userRole !== 'receptionist' && userRole !== 'admin' && userRole !== 'staff') {
    return redirect('/404');
  }
  return null;
};

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: userRole === 'staff' ? <BaberDashboardPage /> : <DashboardPage />,
        loader: internalLoader,
      },
      { path: 'user', element: <UserPage />, loader: resceptionistOrAdminLoader },
      { path: 'footer', element: <FooterPage />, loader: receptionistLoader },
      { path: 'lookbook', element: <LookbookPage />, loader: receptionistLoader },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'services', element: <ServicePage />, loader: receptionistLoader },
      { path: 'appointments', element: <AppointmentPage />, loader: receptionistLoader },
      { path: 'today-schedule', element: <TodaySchedulePage />, loader: receptionistLoader },
      { path: 'general', element: <GeneralPage />, loader: receptionistLoader },
      { path: 'statistic', element: <BlogPage />, loader: internalLoader },
      { path: 'schedule', element: <SchedulePage />, loader: staffLoader },
      { path: 'payment/:id', element: <PaymentPage />, loader: receptionistLoader },
      { path: 'invoices', element: <InvoicePage />, loader: internalLoader },
      { path: 'baber-dashboard', element: <BaberDashboardPage />, loader: staffLoader },
      { path: 'review', element: <ReviewPage />, loader: staffLoader },
      { path: 'gift', element: <GiftPage />, loader: internalLoader },
      { path: 'redemption', element: <RedemptionPage />, loader: internalLoader },
      { path: 'discount', element: <DiscountPage />, loader: receptionistLoader },
      { path: 'salary', element: <SalaryPage />, loader: adminLoader },
      { path: 'profile', element: <ProfilePage />, loader: staffLoader },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '/thankyou/:id/:amount/:method/:invoiceId',
    element: <ThankYouPage />,
  },
  { path: '*', element: <Page404 /> },
];
