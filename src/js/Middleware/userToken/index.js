import { RECEIVEAPI_USER_CREATE, RECEIVEAPI_USER_LOGIN, LOGOUT } from '../../Constants/actions';
import TokenService from '../../Services/token';

const transaction = store => next => action => {
  const { type, payload } = action;

  if (![RECEIVEAPI_USER_CREATE, RECEIVEAPI_USER_LOGIN, LOGOUT].includes(type)) {
    return next(action);
  }

  if (type === LOGOUT) {
    TokenService.logout();
  } else {
    TokenService.setToken(payload.id_token);
  }

  return next(action);
};

export default transaction;
