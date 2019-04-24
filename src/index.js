import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './js/Reducers/configure-store';
import AppRouter from './js/Routes/Router';

import './scss/index.css';

const appStore = store();
const history = syncHistoryWithStore(createBrowserHistory(), appStore);

render(
  <Provider store={ appStore }>
    <AppRouter history={ history } />
  </Provider>,
  document.getElementById('app')
);
