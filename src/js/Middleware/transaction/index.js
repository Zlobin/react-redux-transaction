import { RECEIVEAPI_TRANSACTION_CREATE, FETCHAPI_USER_INFO } from '../../Constants/actions';
import { fetchApi } from '../../Actions/api';

const transaction = store => next => action => {
  if (action.type !== RECEIVEAPI_TRANSACTION_CREATE) {
    return next(action);
  }

  store.dispatch(fetchApi(FETCHAPI_USER_INFO));

  return next(action);
};

export default transaction;
