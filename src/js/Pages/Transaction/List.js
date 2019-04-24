import React from 'react';
import { connect } from 'react-redux';
import PrivatePage from '../PrivatePage';
import TransactionList from '../../Components/Transaction/List';
import { fetchApi } from '../../Actions/api';
import { FETCHAPI_TRANSACTION_LIST } from '../../Constants/actions';

function TransactionListPage(props) {
  return (
    <TransactionList {...props} />
  );
}

const mapStateToProps = ({ transaction }) => ({
  error: transaction.errorApi,
  transactions: transaction.list,
  isWaiting: transaction.listIsFetching
});

const mapDispatchToProps = dispatch => ({
  onRequestList: () => dispatch(fetchApi(FETCHAPI_TRANSACTION_LIST))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePage(TransactionListPage));
