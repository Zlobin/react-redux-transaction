import importComponent from '../Components/Loadable';
import * as routeUrl from '../Constants/routes';

const TransactionCreate = importComponent({
  loader: () => import('../Pages/Transaction/Create')
});

const TransactionList = importComponent({
  loader: () => import('../Pages/Transaction/List')
});

const TransactionRoutes = [
  {
    path: routeUrl.ROUTE_TRANSACTION_CREATE,
    component: TransactionCreate,
    exact: true
  },
  {
    path: routeUrl.ROUTE_TRANSACTION_LIST,
    component: TransactionList,
    exact: true
  }
];

export default TransactionRoutes;
