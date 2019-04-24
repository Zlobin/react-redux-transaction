import React from 'react';
import { connect } from 'react-redux';
import { FETCHAPI_USER_CREATE } from '../Constants/actions';
import RegisterForm from '../Components/Register/Form';
import { fetchApi } from '../Actions/api';
import PublicPage from './PublicPage';

function RegisterPage(props) {
  return (
    <RegisterForm { ...props } />
  );
}

const mapStateToProps = ({ user }) => ({
  isWaiting: user.createIsFetching,
  error: user.errorApi
});

const mapDispatchToProps = dispatch => ({
  onRegister: payload => dispatch(fetchApi(FETCHAPI_USER_CREATE, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage(RegisterPage));
