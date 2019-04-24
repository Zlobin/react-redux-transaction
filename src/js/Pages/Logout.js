import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logout from '../Actions/app';

function LogoutPage({ onLogout, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  onLogout();
  return null;
}

LogoutPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
