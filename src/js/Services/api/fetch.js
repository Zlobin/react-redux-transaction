import { request } from 'axios';
import { HTTP_GET } from '../../Constants/http-methods';

export default async function fetch(url, data = {}, method = HTTP_GET) {
  return request({
    method,
    url,
    validateStatus: status => status >= 200 && status <= 401,
    ...data
  });
}
