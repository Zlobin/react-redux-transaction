import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DefaultLayout from '../Components/Layout/Default';

export default function (ComposedComponent) {
  class PublicPage extends PureComponent {
    render() {
      const { isLoggedIn } = this.props;

      if (isLoggedIn) {
        return <Redirect to='/transaction' />;
      }

      return (
        <DefaultLayout isLoggedIn={isLoggedIn}>
          <ComposedComponent {...this.props} />
        </DefaultLayout>
      );
    }
  }

  PublicPage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  const mapStateToProps = ({ routing, user }) => ({
    isLoggedIn: user.isLoggedIn,
    routing
  });

  return connect(mapStateToProps)(PublicPage);
}
