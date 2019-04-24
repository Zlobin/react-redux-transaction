import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

function DefaultLayout({ children, ...rest }) {
  return (
    <Fragment>
      <Header {...rest} />
      { children }
    </Fragment>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default DefaultLayout;
