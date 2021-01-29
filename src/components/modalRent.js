/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import ErrorItem from './errorItem';
import 'react-datepicker/dist/react-datepicker.css';

const ModalRent = ({ handleClose, show, place }) => {
  const showHideClassName = show ? 'modal1 d-block' : 'modal1 d-none';
  const invalidDates = [new Date()];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [itemError, setItemError] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setItemError(null);
    let isValid = true;
    invalidDates.forEach(element => {
      if (start < element && element < end) {
        isValid = false;
      }
    });
    if (isValid) {
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(end);
    }
  };

  const isValidDates = () => {
    if (startDate && endDate) {
      return true;
    }
    return false;
  };

  const saveRent = () => {
    if (!isValidDates()) {
      setItemError(['Unavailable Date', ['Please select a valid range']]);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main py-4">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between mx-4">
            <div className="d-none">{place}</div>
            <div className="mb-4">
              <h1 className="modal-title">Available Dates</h1>
              <span>(on next 3 months)</span>
            </div>
            <div onClick={handleClose} className="align-self-start">
              <i className="fas fa-times" />
            </div>
          </div>
          <div className="d-flex align-self-center mx-4">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              excludeDates={[new Date()]}
              selectsRange
              inline
            />
          </div>
          <div className="d-flex justify-content-between m-4">
            <div className="d-flex flex-column text-center">
              <span>
                Start Date
              </span>
              <DatePicker
                className="w-75"
                selected={startDate}
                placeholderText="Start Date"
                readOnly
              />
            </div>
            <div className="d-flex flex-column text-center">
              <span>
                End Date
              </span>
              <DatePicker
                className="w-75"
                selected={endDate}
                placeholderText="End Date"
                readOnly
              />
            </div>
          </div>
          <div className="px-4 w-75 align-self-center">
            <Button block size="lg" type="button" variant="info" onClick={saveRent}>
              RENT
            </Button>
          </div>
          { itemError
          && (
          <div className="align-self-center w-75">
            <ErrorItem itemError={itemError} />
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModalRent;
