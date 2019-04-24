import React from 'react';
import { connect } from 'react-redux';
import PrivatePage from '../PrivatePage';
import TransactionForm from '../../Components/Transaction/Form';
import { fetchApi } from '../../Actions/api';
import { FETCHAPI_TRANSACTION_CREATE, FETCHAPI_USER_LIST } from '../../Constants/actions';

function TransactionCreatePage(props) {
  return (
    <TransactionForm {...props} />
  );
}

const mapStateToProps = ({ user, transaction }) => ({
  balance: user.info.balance || 0,
  usersAutosuggestion: user.autosuggestion,
  isWaiting: transaction.createIsFetching,
  error: transaction.errorApi
});

const mapDispatchToProps = dispatch => ({
  onCreate: payload => dispatch(fetchApi(FETCHAPI_TRANSACTION_CREATE, payload)),
  onUserAutosuggestion: payload => dispatch(fetchApi(FETCHAPI_USER_LIST, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePage(TransactionCreatePage));
