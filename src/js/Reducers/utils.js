// transform ACTION_NAME => ActionName
const transformAction = type => type.toLowerCase()
  .split('_')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

export default transformAction;
