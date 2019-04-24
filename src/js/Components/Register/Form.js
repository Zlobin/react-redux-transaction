import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = ({ spacing, breakpoints }) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`
  },
  form: {
    marginTop: spacing.unit
  },
  submit: {
    marginTop: spacing.unit * 3
  }
});

class RegisterForm extends PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    passwordVerification: '',
    error: ''
  }

  handleSubmitForm = event => {
    event.preventDefault();
    const { isWaiting, onRegister } = this.props;
    const {
      passwordVerification,
      password,
      username,
      email
    } = this.state;

    if (passwordVerification !== password) {
      this.setState({
        error: 'Password mismatch'
      });
    } else if (!isWaiting) {
      this.setState({
        error: ''
      }, () => {
        onRegister({ username, email, password });
      });
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      classes,
      isWaiting,
      error
    } = this.props;
    const {
      username,
      email,
      password,
      passwordVerification,
      error: stateError
    } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create an account.
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmitForm} method="POST">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                value={username}
                error={!!error}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                error={!!error}
                onChange={this.handleInputChange}
                autoComplete="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                value={password}
                error={!!(error || stateError)}
                onChange={this.handleInputChange}
                id="password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordVerification">Password again</InputLabel>
              <Input
                name="passwordVerification"
                type="password"
                id="passwordVerification"
                value={passwordVerification}
                error={!!(error || stateError)}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Typography component="h3" variant="caption">
              {stateError || error}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isWaiting}
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

RegisterForm.propTypes = {
  routing: PropTypes.object,
  error: PropTypes.string,
  onRegister: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterForm);
