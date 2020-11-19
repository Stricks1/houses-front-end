
import React, { useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { housesLoad } from '../actions/requestHouses';
import loadImg from '../assets/loadImg.gif';

const HousesList = () => {
  const dispatch = useDispatch();
  const housesState = useSelector(state => state.houses);
  const { places } = housesState
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")){
      history.push('/login')
      return
    }
    dispatch(housesLoad());
  }, [dispatch, history]);

  return (
    <div>
      { housesState.isFetching
        && (
        <div data-testid="loading" className="bg-load">
          <img className="image-load" src={loadImg} alt="loadingImage" />
        </div>
        )}
      <ul className="list-container" data-testid="list-todos">
        { !housesState.isFetching && 'something'
        }
      </ul>
    </div>
  );
}


export default HousesList;