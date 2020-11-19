import React from 'react';
import '../index.css';

const ErrorItem = ({ itemError }) => {
  let label = itemError[0]
  let problems = itemError[1]
  return (
    <div className="d-flex flex-column align-items-center mt-3 text-danger">
      <div>
        <span> <b className="text-capitalize">{label.replace("_"," ")}:</b> </span>
        <span>
          {problems.map(element => {
            return (
              <span key={element}>
                {element}
              </span>
            )
          })}
        </span>
      </div>
    </div>
  );
};

export default ErrorItem;