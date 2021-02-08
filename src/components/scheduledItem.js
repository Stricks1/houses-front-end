/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import '../index.css';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RentItem = ({ scheduled }) => {
  const {
    place,
  } = scheduled;
  const startDate = scheduled.start_date;
  const endDate = scheduled.end_date;
  const rentPrice = scheduled.rent_price;
  return (
    <div className="single-schedule-container w-100 my-3 p-4">
      <Link className="text-decoration-none" to={`/house/${place.id}`} id="link-detail">
        <div className="d-flex-around title-card d-flex flex-column justify-content-around align-items-center">
          <div className="city-loc">
            <span>
              {`${place.city} - ${place.country}`}
            </span>
          </div>
          <div className="d-flex flex-column price-info align-items-center">
            <span className="mb-3">
              Total $
              {' '}
              {parseFloat(rentPrice).toFixed(2)}
            </span>
            <span className="small-label">
              Start at:
              {startDate}
            </span>
            <span className="small-label">
              Ends at:
              {endDate}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

RentItem.propTypes = {
  scheduled: PropTypes.any,
};

export default withRouter(RentItem);
