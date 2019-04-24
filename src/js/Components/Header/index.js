import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import UserBlock from './UserBlock';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -22,
    marginRight: 20
  }
};

function LoggerNav() {
  return (
    <Fragment>
      <Button component={Link} to="/transaction/create" color="inherit">Create</Button>
      <Button component={Link} to="/transaction" color="inherit">List</Button>
      <Button component={Link} to="/logout" color="inherit">Logout</Button>
    </Fragment>
  );
}

function NotLoggerNav() {
  return (
    <Fragment>
      <Button component={Link} to="/login" color="inherit">Login</Button>
      <Button component={Link} to="/register" color="inherit">Register</Button>
    </Fragment>
  );
}

function Header({ user = {}, classes, isLoggedIn }) {
  const hasUserData = Object.keys(user).length;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {
            hasUserData
              ? <UserBlock {...user} />
              : null
          }
        </Typography>
          {
            isLoggedIn
              ? <LoggerNav />
              : <NotLoggerNav />
          }
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
