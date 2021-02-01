/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useLocation, useHistory } from 'react-router-dom';
import { OCCUPIED } from '../helpers/constants';
import { CHANGE_MESS } from '../actions/messages';
import { sendAuthorizedRequest } from '../helpers/api';
import ErrorItem from './errorItem';
import 'react-datepicker/dist/react-datepicker.css';

const ModalRent = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const showHideClassName = show ? 'modal1 d-block' : 'modal1 d-none';
  const [startDate, setStartDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  const [excludeDates, setExcludeDates] = useState([]);
  const [placeId] = useState(useLocation().pathname.split('/').pop());
  const [endDate, setEndDate] = useState(null);
  const [itemError, setItemError] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setItemError(null);
    let isValid = true;
    excludeDates.forEach(element => {
      if (start <= element && element <= end) {
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

  function setMaxDateCalendar(maxDateValid) {
    setMaxDate(maxDateValid);
  }

  function findOccupied(placeId) {
    try {
      const path = `${OCCUPIED}/${placeId}`;
      const today = new Date();
      const oneYear = new Date();
      oneYear.setMonth(today.getMonth() + 12);
      setMaxDateCalendar(oneYear);
      const dataSent = {
        place: {
          date_ini: today.toISOString().slice(0, 10),
          date_end: oneYear.toISOString().slice(0, 10),
        },
      };
      sendAuthorizedRequest('post', path, localStorage.getItem('token'), dataSent)
        .then(response => {
          if (response) {
            const arrayExcluded = [];
            response.data.occupied[0].forEach(uniqueDate => {
              arrayExcluded.push(new Date(uniqueDate.split('-')));
            });
            setExcludeDates(arrayExcluded);
          }
        });
    } catch (error) {
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  }

  const saveRent = () => {
    if (!isValidDates()) {
      setItemError(['Unavailable Date', ['Please select a valid range']]);
    } else {
      const unblur = document.getElementsByClassName('blurrable');
      let i;
      for (i = 0; i < unblur.length; i += 1) {
        unblur[i].classList.remove('blur');
      }
      history.push('/rent_dates');
    }
  };

  useEffect(() => {
    if (placeId) {
      findOccupied(placeId);
    }
  }, [placeId]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main py-4">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between mx-4">
            <div className="mb-4">
              <h1 className="modal-title">Available Dates</h1>
              <span>(for 1 year)</span>
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
              excludeDates={excludeDates}
              minDate={new Date()}
              maxDate={maxDate}
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
                dateFormat="yyyy/MM/dd"
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
                dateFormat="yyyy/MM/dd"
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
