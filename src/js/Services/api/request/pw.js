import Api from '../api';
import {
  API_MAP_USER_CREATE,
  API_MAP_USER_LIST,
  API_MAP_USER_INFO,
  API_MAP_TRANSACTION_CREATE,
  API_MAP_TRANSACTION_LIST,
  API_MAP_LOGIN
} from '../../../Constants/api-map';
import { HTTP_GET, HTTP_POST, HTTP_PUT } from '../../../Constants/http-methods';

class PW extends Api {
  map = {
    /*
      Create/Register a user
      body:
      {username, password, email}
      returns:
      {id_token}
      errors:
      400: A user with that email already exists
      400: You must send username and password
    */
    [API_MAP_USER_CREATE]: {
      path: 'users',
      method: HTTP_POST
    },
    /*
      Login
      body:
      {email, password}
      returns:
      {id_token}
      errors:
      400: You must send email and password.
      401: Invalid email or password.
    */
    [API_MAP_LOGIN]: {
      path: 'sessions/create',
      method: HTTP_POST
    },
    /*
      List of logged user transactions
      authentication: bearer
      body:
      returns:
      {trans_token:[{id, date, username, amount, balance}]}
      errors:
      401: UnauthorizedError
      401: Invalid user
    */
    [API_MAP_TRANSACTION_LIST]: {
      path: 'api/protected/transactions',
      method: HTTP_GET
    },
    /*
      Create a transaction
      Sender: logged user
      Recipient: name in a body
      authentication: bearer
      body:
      {name, amount}
      returns:
      {trans_token:{id, date, username, amount, balance}}
      errors:
      400: user not found
      400: balance exceeded
      401: UnauthorizedError
      401: Invalid user
    */
    [API_MAP_TRANSACTION_CREATE]: {
      path: 'api/protected/transactions',
      method: HTTP_POST
    },
    /*
      Logged user info
      authentication: bearer
      body:
      returns: {id, name, email, balance}
      errors:
      400: user not found
      401: UnauthorizedError
      401: Invalid user
    */
    [API_MAP_USER_INFO]: {
      path: 'api/protected/user-info',
      method: HTTP_GET
    },
    /*
      Filtered User list
      authentication: bearer
      body:
      {filter}
      returns:
      [{id, name}]
      errors:
      401: UnauthorizedError
      401: Invalid user
      401: No search string
    */
    [API_MAP_USER_LIST]: {
      path: 'api/protected/users/list',
      method: HTTP_POST
    }
  }

  apiUrl = ''

  getFullApiPath() {
    return `${this.apiPath}${this.apiUrl}`;
  }

  request(type, tokenId = null, payload = {}) {
    const { path, method } = this.map[type] || {};
    const params = {};

    this.apiUrl = path;

    if (tokenId) {
      params.headers = {
        Authorization: `bearer ${tokenId}`
      };
    }

    if ([HTTP_POST, HTTP_PUT].indexOf(method) >= 0) {
      params.data = payload;

      if (type === API_MAP_USER_LIST) {
        params.data = {
          filter: payload
        };
      }
    }

    return this.fetch(params, method);
  }
}

export default new PW('http://193.124.114.46:3001/');
