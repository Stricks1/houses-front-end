
import React, { useEffect }  from 'react';
import { useParams} from "react-router";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { housesLoad } from '../actions/requestHouses';
import loadImg from '../assets/loadImg.gif';

const HouseDetail = () => {
  const dispatch = useDispatch();
  const housesState = useSelector(state => state.houses);
  let { id } = useParams();
  const { places } = housesState
  let place = false
  if (places.places) {
    place = places.places.find(element => element.id === id);
  }
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
      { !housesState.isFetching && place &&
        <div className="d-flex justify-content-center">
          <h1>House</h1>
        </div>
      }
    </div>
  );
}

export default HouseDetail;
