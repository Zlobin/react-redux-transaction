import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ROUTE_NOT_FOUND } from '../Constants/routes';
import Routes from './Map';

function AppRouter(props) {
  const { history } = props;

  return (
    <Router history={history}>
      <Switch>
        {
          Routes.map(({ path, ...route }) => <Route
            {...route}
            path={path}
            key={path}
          />)
        }

        <Redirect to={ROUTE_NOT_FOUND} />
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default AppRouter;
