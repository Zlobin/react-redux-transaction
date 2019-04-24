import { HTTP_GET } from '../../Constants/http-methods';
import fetch from './fetch';

class Api {
  constructor(apiPath = null) {
    this.apiPath = apiPath;
  }

  getFullApiPath() {
    return this.apiPath;
  }

  fetch(params, method = HTTP_GET) {
    return fetch(this.getFullApiPath(), params, method);
  }
}

export default Api;
