/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

const ErrorItem = ({ itemError }) => {
  const label = itemError[0];
  const problems = itemError[1];
  return (
    <div className="d-flex flex-column align-items-center mt-3 text-danger">
      <div>
        <span>
          {' '}
          <b className="text-capitalize">
            {label.replace('_', ' ')}
            :
          </b>
          {' '}
        </span>
        <span>
          {problems.map(element => (
            <span key={element}>
              {element}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

ErrorItem.propTypes = {
  itemError: PropTypes.any,
};

export default ErrorItem;
