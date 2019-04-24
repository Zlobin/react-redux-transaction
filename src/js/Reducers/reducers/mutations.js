function FetchapiUserLogin(state) {
  return {
    ...state,
    errorApi: '',
    loginIsFetching: true
  };
}

function FetchapiUserInfo(state) {
  return {
    ...state,
    errorApi: '',
    infoIsFetching: true
  };
}

function FetchapiUserCreate(state) {
  return {
    ...state,
    errorApi: '',
    createIsFetching: true
  };
}

function FetchapiUserList(state) {
  return {
    ...state,
    errorApi: '',
    listIsFetching: true
  };
}

function FetchapiTransactionCreate(state) {
  return {
    ...state,
    errorApi: '',
    createIsFetching: true
  };
}

function FetchapiTransactionList(state) {
  return {
    ...state,
    errorApi: '',
    listIsFetching: false
  };
}

function ReceiveapiUserList(state, payload) {
  return {
    ...state,
    autosuggestion: payload,
    listIsFetching: false,
    errorApi: ''
  };
}

function ReceiveapiUserLogin(state, { id_token: tokenId = '' }) {
  return {
    ...state,
    isLoggedIn: !!tokenId,
    tokenId,
    errorApi: '',
    loginIsFetching: false
  };
}

function ReceiveapiUserCreate(state, { id_token: tokenId = '' }) {
  return {
    ...state,
    isLoggedIn: !!tokenId,
    tokenId,
    errorApi: '',
    createIsFetching: false
  };
}

function ReceiveapiUserInfo(state, { user_info_token: info = {} }) {
  return {
    ...state,
    info,
    errorApi: '',
    infoIsFetching: false
  };
}

function ReceiveapiTransactionCreate(state) {
  return {
    ...state,
    errorApi: '',
    createIsFetching: false
  };
}

function ReceiveapiTransactionList(state, { trans_token: list = [] }) {
  return {
    ...state,
    list,
    listIsFetching: false
  };
}

function UserErrorApi(state, payload) {
  return {
    ...state,
    infoIsFetching: false,
    createIsFetching: false,
    loginIsFetching: false,
    listIsFetching: false,
    errorApi: payload
  };
}

function TransactionErrorApi(state, payload) {
  return {
    ...state,
    listIsFetching: false,
    createIsFetching: false,
    errorApi: payload
  };
}

function Logout(state) {
  return {
    ...state,
    info: {},
    autosuggestion: [],
    tokenId: '',
    isLoggedIn: false,
    infoIsFetching: false,
    createIsFetching: false,
    loginIsFetching: false,
    listIsFetching: false,
    errorApi: ''
  };
}

export {
  FetchapiUserLogin,
  FetchapiUserCreate,
  FetchapiUserInfo,
  FetchapiUserList,
  FetchapiTransactionList,
  FetchapiTransactionCreate,
  ReceiveapiUserLogin,
  ReceiveapiUserCreate,
  ReceiveapiUserInfo,
  ReceiveapiUserList,
  ReceiveapiTransactionList,
  ReceiveapiTransactionCreate,
  UserErrorApi,
  TransactionErrorApi,
  Logout
};
