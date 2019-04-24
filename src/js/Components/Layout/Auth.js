import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

function AuthLayout({ children, ...rest }) {
  return (
    <Fragment>
      <Header {...rest} />
      { children }
    </Fragment>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthLayout;
