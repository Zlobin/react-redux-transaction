import * as action from '../Constants/actions';

const fetchApi = (type, payload) => ({
  type: action[type],
  payload
});

const receiveApi = (type, payload) => ({
  type: action[type],
  payload
});

const userErrorApi = payload => ({
  type: action.USER_ERROR_API,
  payload
});

const transactionErrorApi = payload => ({
  type: action.TRANSACTION_ERROR_API,
  payload
});

export {
  transactionErrorApi,
  userErrorApi,
  fetchApi,
  receiveApi
};
