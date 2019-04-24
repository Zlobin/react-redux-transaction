import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthLayout from '../Components/Layout/Auth';
import { FETCHAPI_USER_INFO } from '../Constants/actions';
import { fetchApi } from '../Actions/api';

export default function (ComposedComponent) {
  class PrivatePage extends PureComponent {
    componentDidMount() {
      const { user, fetchUserInfo } = this.props;

      if (!Object.keys(user).length) {
        fetchUserInfo();
      }
    }

    render() {
      const { user, isLoggedIn } = this.props;

      if (!isLoggedIn) {
        return <Redirect to='/login' />;
      }

      return (
        <AuthLayout isLoggedIn={isLoggedIn} user={user}>
          <ComposedComponent {...this.props} />
        </AuthLayout>
      );
    }
  }

  PrivatePage.propTypes = {
    fetchUserInfo: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  const mapStateToProps = ({ routing, user }) => ({
    isLoggedIn: user.isLoggedIn,
    user: user.info,
    routing
  });

  const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => dispatch(fetchApi(FETCHAPI_USER_INFO))
  });

  return connect(mapStateToProps, mapDispatchToProps)(PrivatePage);
}
