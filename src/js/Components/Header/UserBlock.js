import React from 'react';
import PropTypes from 'prop-types';

function UserBlock({ name, balance }) {
  return (
    <span>{name}, {balance} PW</span>
  );
}

UserBlock.propTypes = {
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
};

export default UserBlock;
