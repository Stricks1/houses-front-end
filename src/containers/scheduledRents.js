import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { scheduledLoad } from '../actions/requestScheduled';
import RentItem from '../components/scheduledItem';
import loadImg from '../assets/loadImg.gif';

const SchedulesList = () => {
  const dispatch = useDispatch();
  const scheduledState = useSelector(state => state.scheduled);
  const { scheduled } = scheduledState;
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
      return;
    }
    dispatch(scheduledLoad());
  }, [dispatch, history]);

  return (
    <div>
      { scheduledState.isFetching
        && (
        <div data-testid="loading" className="bg-load">
          <img className="image-load" src={loadImg} alt="loadingImage" />
        </div>
        )}
      { !scheduledState.isFetching
          && (
          <div className="d-flex justify-content-center">
            <h1>Scheduled Rents</h1>
          </div>
          )}
      <div className="cards-container">
        { !scheduledState.isFetching && scheduled
          && scheduled.map(rent => (
            <RentItem
              key={rent.id}
              scheduled={rent.attributes}
            />
          ))}
      </div>
    </div>
  );
};

export default SchedulesList;
