import importComponent from '../Components/Loadable';
import * as routeUrl from '../Constants/routes';
import TransactionMap from './TransactionMap';

const LoginPage = importComponent({
  loader: () => import('../Pages/Login')
});

const RegisterPage = importComponent({
  loader: () => import('../Pages/Register')
});

const LogoutPage = importComponent({
  loader: () => import('../Pages/Logout')
});

const NotFoundPage = importComponent({
  loader: () => import('../Pages/NotFound')
});

const Routes = [
  {
    path: routeUrl.ROUTE_HOME,
    exact: true,
    component: LoginPage
  },
  {
    path: routeUrl.ROUTE_LOGIN,
    component: LoginPage,
    exact: true
  },
  {
    path: routeUrl.ROUTE_LOGOUT,
    component: LogoutPage,
    exact: true
  },
  {
    path: routeUrl.ROUTE_REGISTER,
    component: RegisterPage,
    exact: true
  },
  {
    path: routeUrl.ROUTE_NOT_FOUND,
    component: NotFoundPage,
    exact: true
  },
  ...TransactionMap
];

export default Routes;
