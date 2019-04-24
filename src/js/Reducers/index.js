import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import transaction from './reducers/transaction';
import user from './reducers/user';

const rootReducer = combineReducers({
  routing,
  transaction,
  user
});

export default rootReducer;
