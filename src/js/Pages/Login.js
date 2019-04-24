import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCHAPI_USER_LOGIN } from '../Constants/actions';
import LoginForm from '../Components/Login/Form';
import { fetchApi } from '../Actions/api';
import PublicPage from './PublicPage';

function LoginPage(props) {
  return (
    <LoginForm { ...props } />
  );
}

LoginPage.propTypes = {
  routing: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user, routing }) => ({
  isWaiting: user.loginIsFetching,
  error: user.errorApi,
  routing
});

const mapDispatchToProps = dispatch => ({
  onLogin: payload => dispatch(fetchApi(FETCHAPI_USER_LOGIN, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage(LoginPage));
