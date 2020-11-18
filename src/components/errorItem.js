import React from 'react';
import '../index.css';

const ErrorItem = ({ itemError }) => {
  let label = itemError[0]
  let problems = itemError[1]
  return (
    <div>
      <p> {label} </p>
      <div>
        {problems.map(element => {
          return (
            <span key={element}>
              {element}
            </span>
          )
        })}
      </div>
    </div>
  );
};

export default ErrorItem;