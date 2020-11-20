import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import ErrorItem from '../components/errorItem';

const ErrorMessageContainer = ({ users }) => {
  const messages = users.errors;
  return (
    <div className="d-flex flex-column">
      { messages.length > 0 && (
        <div className="info-message">
          {messages.map(itemError => (<ErrorItem key={itemError[0]} itemError={itemError} />))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(ErrorMessageContainer);
