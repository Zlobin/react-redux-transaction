import * as actions from '../../Constants/actions';
import * as mutations from './mutations';
import tokenService from '../../Services/token';
import trasformAction from '../utils';

const initialState = {
  info: {},
  autosuggestion: [],
  createIsFetching: false,
  loginIsFetching: false,
  infoIsFetching: false,
  listIsFetching: false,
  isLoggedIn: tokenService.isLoggedIn(),
  tokenId: tokenService.getToken(),
  errorApi: ''
};

const user = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case actions.RECEIVEAPI_USER_CREATE:
    case actions.RECEIVEAPI_USER_LOGIN:
    case actions.RECEIVEAPI_USER_INFO:
    case actions.RECEIVEAPI_USER_LIST:
    case actions.FETCHAPI_USER_CREATE:
    case actions.FETCHAPI_USER_LOGIN:
    case actions.FETCHAPI_USER_INFO:
    case actions.FETCHAPI_USER_LIST:
    case actions.USER_ERROR_API:
    case actions.LOGOUT:
      return mutations[trasformAction(type)](state, payload);
    default:
      return state;
  }
};

export default user;
