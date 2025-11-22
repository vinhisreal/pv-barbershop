import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Booking from "../pages/Booking";
import UpdateBooking from "../pages/UpdateBooking";
import Workbench from "../pages/Workbench";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";

import MainLayout from "../layouts/MainLayout";
import Empty from "../layouts/Empty";
import Account from "../pages/Account";
import Password from "../pages/Password";
import About from "../pages/About";
import Barber from "../pages/Barber";
import Service from "../pages/ServiceList";

import Gift from "../pages/Gift";
import History from "../pages/History";
import RestorePassword from "../pages/RestorePassword";

const publicRoutes = [
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.booking, component: Booking, layout: MainLayout },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.notFound, component: NotFound, layout: null },
  { path: config.routes.about, component: About, layout: MainLayout },
  { path: config.routes.logout, component: Logout, layout: null },
  { path: config.routes.account, component: Account, layout: MainLayout },
  { path: config.routes.barber, component: Barber, layout: MainLayout },
  { path: config.routes.service, component: Service, layout: MainLayout },
  { path: config.routes.history, component: History, layout: MainLayout },
  {
    path: config.routes.gift,
    component: Gift,
    layout: MainLayout,
  },
  {
    path: config.routes.changePassword,
    component: Password,
    layout: MainLayout,
  },
  {
    path: config.routes.updateBooking,
    component: UpdateBooking,
    layout: Empty,
  },
  {
    path: config.routes.restore,
    component: RestorePassword,
    layout: null,
  },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.workbench,
    component: Workbench,
  },
  {
    type: "receptionist",
    path: config.routes.workbench,
    component: Workbench,
  },
  {
    type: "staff",
    path: config.routes.workbench,
    component: Workbench,
  },
];

export { publicRoutes, privateRoutes };
