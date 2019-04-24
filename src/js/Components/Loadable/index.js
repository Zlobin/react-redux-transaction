import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableDefaultOptions = {
  loading: Loading,
  delay: 100,
  timeout: 200,
  // Unfortunately at the moment using wrapped Loadable breaks
  // react-loadable/babel so in such case you have to add required
  // properties (modules, webpack) manually.
  modules: ['./MyComponent']
};

function importComponent(opts) {
  return Loadable({
    ...LoadableDefaultOptions,
    ...opts
  });
}

export default importComponent;

export {
  LoadableDefaultOptions,
  Loadable
};
