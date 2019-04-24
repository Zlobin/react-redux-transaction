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
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

function renderInputComponent(inputProps) {
  const {
    classes,
    inputRef = () => {},
    ref,
    ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion({ name }, { query, isHighlighted }) {
  const matches = match(name, query);
  const parts = parse(name, matches);

  /* eslint-disable no-confusing-arrow */
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(({ text, highlight }, index) => highlight
          ? (
            <span key={String(index)}>
              {text}
            </span>
          )
          : (
            <strong key={String(index)}>
              {text}
            </strong>
          ))}
      </div>
    </MenuItem>
  );
  /* eslint-enable no-confusing-arrow */
}

renderSuggestion.propTypes = {
  name: PropTypes.string.isRequired
};

function getSuggestions(list, value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const totalResult = 5;
  let count = 0;

  return inputLength === 0
    ? []
    : list.filter(({ name }) => {
      const keep = count < totalResult
        && name.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class TransactionForm extends PureComponent {
  state = {
    name: '',
    amount: 0,
    suggestions: [],
    error: ''
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.usersAutosuggestion, value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const { isWaiting, onCreate, balance } = this.props;
    const { amount, name } = this.state;

    if (balance < amount) {
      this.setState({
        error: 'You do not have enought money'
      });
    } else if (!name) {
      this.setState({
        error: 'Please enter username'
      });
    } else if (amount <= 0) {
      this.setState({
        error: 'Amount should not be less or equal to zero'
      });
    } else if (!isWaiting) {
      this.setState({
        error: ''
      }, () => {
        onCreate({ name, amount });
      });
    }
  }

  handleAmountChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleInputChange = name => (event, { newValue = null }) => {
    if (newValue.length > 1) {
      this.props.onUserAutosuggestion(newValue);
    }

    this.setState({
      [name]: newValue
    });
  }

  render() {
    const {
      classes,
      isWaiting,
      error
    } = this.props;
    const {
      name,
      amount,
      error: stateError
    } = this.state;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Send money.
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmitForm} method="POST">
            <FormControl margin="normal" required fullWidth>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  placeholder: 'Search username...',
                  value: name,
                  name: 'name',
                  onChange: this.handleInputChange('name')
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <Input
                id="amount"
                type="number"
                step="0.01"
                name="amount"
                value={amount}
                error={!!(error || stateError)}
                onChange={this.handleAmountChange}
                autoComplete="email"
              />
            </FormControl>
            <Typography component="h3" variant="caption">
              {error || stateError}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isWaiting}
              className={classes.submit}
            >
              Send
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

TransactionForm.propTypes = {
  error: PropTypes.string,
  onUserAutosuggestion: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  usersAutosuggestion: PropTypes.array.isRequired,
  isWaiting: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired
};

export default withStyles(styles)(TransactionForm);
