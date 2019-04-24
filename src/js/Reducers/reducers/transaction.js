import * as actions from '../../Constants/actions';
import * as mutations from './mutations';
import trasformAction from '../utils';

const initialState = {
  createIsFetching: false,
  listIsFetching: false,
  list: [],
  errorApi: ''
};

const transaction = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case actions.RECEIVEAPI_TRANSACTION_CREATE:
    case actions.RECEIVEAPI_TRANSACTION_LIST:
    case actions.FETCHAPI_TRANSACTION_CREATE:
    case actions.FETCHAPI_TRANSACTION_LIST:
    case actions.TRANSACTION_ERROR_API:
      return mutations[trasformAction(type)](state, payload);
    default:
      return state;
  }
};

export default transaction;
