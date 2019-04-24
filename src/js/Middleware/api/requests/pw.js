import pw from '../../../Services/api/request/pw';
import { userErrorApi, transactionErrorApi, receiveApi } from '../../../Actions/api';
import apiMap from '../../../Constants/api-map';

// UserAction -> USER_ACTION
const convertAction = action => action.split(/(?=[A-Z])/).join('_').toUpperCase();

const pwRequest = async (dispatch, typeAction, tokenId = null, payload = {}) => {
  const errorApi = typeAction.toLowerCase().includes('user')
    ? userErrorApi
    : transactionErrorApi;
  if (Object.values(apiMap).indexOf(typeAction) < 0) {
    dispatch(errorApi('Incorrect API request'));
  }
  let response = {};

  try {
    response = await pw.request(typeAction, tokenId, payload);
  } catch (error) {
    dispatch(errorApi(error));
  }

  const { data, status } = response;

  return dispatch((status >= 200 && status < 300)
    ? receiveApi(`RECEIVEAPI_${convertAction(typeAction)}`, data)
    : errorApi(data));
};

export default pwRequest;
