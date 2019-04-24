import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = ({ spacing }) => ({
  root: {
    width: '100%',
    marginTop: spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

class TransactionList extends PureComponent {
  componentDidMount() {
    this.props.onRequestList();
  }

  render() {
    const { transactions = [], classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(transactions) && transactions
              .map(({
                id,
                date,
                username,
                amount,
                balance
              }) => (
                <TableRow key={id}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{balance}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TransactionList.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  onRequestList: PropTypes.func.isRequired
};

export default withStyles(styles)(TransactionList);
