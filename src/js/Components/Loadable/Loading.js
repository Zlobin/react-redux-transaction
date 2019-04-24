import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

function RetryButton({ onRetry }) {
  return <button onClick={ onRetry }>Retry</button>;
}

RetryButton.propTypes = {
  onRetry: PropTypes.func
};

/* eslint-disable no-else-return */
function Loading({
  pastDelay,
  error,
  retry,
  timedOut
}) {
  if (error) {
    return (<span className="error-loading-component">
      Error while loading a component, {error.toString()}! <RetryButton onRetry={ retry } />
    </span>);
  } else if (timedOut) {
    return (<span className="error-loading-component">
      Taking a long time... <RetryButton onRetry={ retry } />
    </span>);
  } else if (pastDelay) {
    return <Spinner />;
  }

  return null;
}
/* eslint-enable no-else-return */

Loading.propTypes = {
  pastDelay: PropTypes.bool,
  error: PropTypes.string,
  retry: PropTypes.func,
  timedOut: PropTypes.bool
};

export default Loading;
