import pwAPI from './requests/pw';

const convertAction = action => action.toLowerCase()
  .split('_')
  .slice(1)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const api = store => next => action => {
  const { type = '', payload } = action;
  const isFetchingAction = type.startsWith('FETCHAPI_');

  // Handle FETCHAPI actions only.
  if (!isFetchingAction) {
    return next(action);
  }

  const { dispatch, getState } = store;
  const { user = {} } = getState();
  const typeAction = convertAction(type);

  if (!typeAction) {
    return next(action);
  }

  pwAPI(dispatch, typeAction, user.tokenId, payload);
  return next(action);
};

export default api;
