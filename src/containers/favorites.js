import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoritesLoad } from '../actions/requestFavorites';
import { housesLoad } from '../actions/requestHouses';
import loadImg from '../assets/loadImg.gif';
import Place from '../components/place';

const FavList = () => {
  const dispatch = useDispatch();
  const housesState = useSelector(state => state.houses);
  const favoritesState = useSelector(state => state.favorites);
  const { places } = housesState;
  const history = useHistory();
  console.log('calling');
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
      return;
    }
    dispatch(housesLoad());
    dispatch(favoritesLoad());
  }, [dispatch, history]);

  return (
    <div>
      { (housesState.isFetching || favoritesState.isFetching)
        && (
        <div data-testid="loading" className="bg-load">
          <img className="image-load" src={loadImg} alt="loadingImage" />
        </div>
        )}
      { !housesState.isFetching && !favoritesState.isFetching
          && (
          <div className="d-flex justify-content-center">
            <h1>Favorite List</h1>
          </div>
          )}
      <div className="cards-container">
        { !housesState.isFetching && places.places
          && places.places.map(place => (
            <Place
              key={place.id}
              place={place}
              isFav={favoritesState.favorite.includes(parseInt(place.id, 10))}
            />
          )).filter(item => (item.props.isFav))}
      </div>
    </div>
  );
};

export default FavList;
