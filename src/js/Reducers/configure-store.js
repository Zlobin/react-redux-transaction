import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import api from '../Middleware/api';
import transaction from '../Middleware/transaction';
import userToken from '../Middleware/userToken';
import rootReducer from '.';

const enhancer = compose(
  applyMiddleware(
    userToken,
    transaction,
    api
  )
);

export default (initialState = {}) => createStore(rootReducer, initialState, enhancer);
