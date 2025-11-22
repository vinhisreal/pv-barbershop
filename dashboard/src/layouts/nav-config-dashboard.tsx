/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-named-imports */
import Cookie from 'js-cookie';

// Import icons từ MUI
import {
  Dashboard,
  Person,
  ShoppingCart,
  Inventory,
  CalendarToday,
  Schedule,
  ReceiptLong,
  RateReview,
  CardGiftcard,
  Redeem,
  LocalOffer,
  Money,
  PhotoLibrary,
  Web,
  AccountCircle,
} from '@mui/icons-material';

// ----------------------------------------------------------------------

const userRole = Cookie.get('user_role_name'); // Lấy userRole từ cookie
export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};
export const navData: NavItem[] = [
  ...(userRole === 'receptionist' || userRole === 'admin'
    ? [
        {
          title: 'dashboard',
          path: '/',
          icon: <Dashboard />,
        },
      ]
    : []),
  ...(userRole === 'admin'
    ? [
        {
          title: 'salary',
          path: '/salary',
          icon: <Money />,
        },
        {
          title: 'user',
          path: '/user',
          icon: <Person />,
        },
        {
          title: 'invoice',
          path: '/invoices',
          icon: <ReceiptLong />,
        },
      ]
    : []),
  ...(userRole === 'receptionist'
    ? [
        {
          title: 'general',
          path: '/general',
          icon: <CalendarToday />,
        },
        {
          title: 'today',
          path: '/today-schedule',
          icon: <Schedule />,
        },
        {
          title: 'appointment',
          path: '/appointments',
          icon: <CalendarToday />,
        },
        {
          title: 'service',
          path: '/services',
          icon: <ShoppingCart />,
        },
        {
          title: 'invoice',
          path: '/invoices',
          icon: <ReceiptLong />,
        },
        {
          title: 'discount',
          path: '/discount',
          icon: <LocalOffer />,
        },
        {
          title: 'footer',
          path: '/footer',
          icon: <Web />,
        },
        {
          title: 'lookbook',
          path: '/lookbook',
          icon: <PhotoLibrary />,
        },
      ]
    : []),
  ...(userRole === 'staff'
    ? [
        {
          title: 'dashboard',
          path: '/baber-dashboard',
          icon: <Dashboard />,
        },
        {
          title: 'schedule',
          path: '/schedule',
          icon: <Schedule />,
        },
        {
          title: 'review',
          path: '/review',
          icon: <RateReview />,
        },
        {
          title: 'profile',
          path: '/profile',
          icon: <AccountCircle />,
        },
      ]
    : []),
  ...(userRole === 'receptionist'
    ? [
        {
          title: 'user',
          path: '/user',
          icon: <Person />,
        },
        {
          title: 'gift',
          path: '/gift',
          icon: <CardGiftcard />,
        },
        {
          title: 'redemption',
          path: '/redemption',
          icon: <Redeem />,
        },
      ]
    : []),
];
