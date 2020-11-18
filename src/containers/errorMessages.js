import React from 'react';
import '../index.css';
import ErrorItem from '../components/errorItem';
import { connect } from 'react-redux';

const ErrorMessageContainer = ({ users }) => {
  const messages = users.errors
  return (
    <div>
      { messages.length > 0 && (
        <div className="info-message self-center">
          {messages.map(itemError =>
            (<ErrorItem key={itemError[0]} itemError={itemError} />)
          )}
        </div>
      )}
    </div>
  )
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(ErrorMessageContainer);