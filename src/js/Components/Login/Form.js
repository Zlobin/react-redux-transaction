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

class LoginForm extends PureComponent {
  state = {
    email: '',
    password: ''
  }

  handleSubmitForm = event => {
    const { isWaiting, onLogin } = this.props;

    event.preventDefault();
    if (!isWaiting) {
      onLogin(this.state);
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
    const { email, password } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmitForm} method="POST">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                type="email"
                value={email}
                name="email"
                error={!!error}
                onChange={this.handleInputChange}
                autoComplete="email" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                value={password}
                id="password"
                error={!!error}
                onChange={this.handleInputChange}
                autoComplete="current-password" />
            </FormControl>
            <Typography component="h3" variant="caption">
              {error}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isWaiting}
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LoginForm.propTypes = {
  routing: PropTypes.object,
  error: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
