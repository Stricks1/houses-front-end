
import React, { useEffect }  from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { housesLoad } from '../actions/requestHouses';
import loadImg from '../assets/loadImg.gif';
import Place from '../components/place';

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
        { !housesState.isFetching &&
          <div className="d-flex justify-content-center">
            <h1>Houses</h1>
          </div>
        }
      <div className="cards-container">
        { !housesState.isFetching && places.places &&
          places.places.map(place => (<Place key={place.id} place={place} />))
        }
      </div>
    </div>
  );
}

export default HousesList;