/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import '../index.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { housesLoad } from '../actions/requestHouses';
import { URL, IMAGES } from '../helpers/constants';
import { CHANGE_MESS } from '../actions/messages';

// <button className="d-flex mx-auto">Teste</button>

const HouseInfo = ({ place, isOwner, isFav }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  console.log(isFav);
  if (place.images.length === 0) {
    const fillerImg = { url: 'https://dummyimage.com/600x500/ffffff/000000.png&text=NO+IMAGE', id: 0 };
    place.images.push(fillerImg);
  }
  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };

  function handleDeleteImage(imgId) {
    try {
      const urlCall = `${URL}${IMAGES}/${imgId}`;
      axios
        .delete(
          urlCall,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then(response => {
          if (response) {
            dispatch(housesLoad());
          }
        });
    } catch (error) {
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  }

  function renderType(rentType) {
    switch (rentType) {
      case 1:
        return 'House';
      case 2:
        return 'Apartment';
      case 3:
        return 'Room';
      default:
        return '';
    }
  }

  function removeFavorite() {
    console.log('remove fav here');
  }

  function addFavorite() {
    console.log('add fav here');
  }

  function changeClassUp() {
    const starEl = document.getElementById('starFav');
    starEl.classList.remove('far');
    starEl.classList.add('fas');
  }

  function changeClassOut() {
    const starEl = document.getElementById('starFav');
    starEl.classList.remove('fas');
    starEl.classList.add('far');
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESS,
      payload: '',
    });
  }, [dispatch]);

  return (
    <div className="mx-4 d-flex flex-column justify-content-center">
      <div className="title d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-center">
          <h3>{place.description.city}</h3>
          <p>{place.description.country}</p>
        </div>
        { isFav ? (
          <div tabIndex={0} role="button" onClick={() => removeFavorite()} onKeyDown={() => removeFavorite()}>
            <i className="fas fa-star favClick" />
          </div>
        )
          : (
            <div tabIndex={0} role="button" onClick={() => addFavorite()} onKeyDown={() => addFavorite()}>
              <i
                id="starFav"
                className="far fa-star favClick"
                onMouseOver={() => changeClassUp()}
                onFocus={() => changeClassUp()}
                onMouseOut={() => changeClassOut()}
                onBlur={() => changeClassOut()}
              />
            </div>
          )}
      </div>
      <div className="d-flex flex-column align-items-center">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={20000}
        >
          {place.images.map(image => (
            <Carousel.Item key={`image${image.id}`}>
              <img
                className="d-block w-100"
                src={image.url}
                alt={image.id}
              />
              <Carousel.Caption />
              {((image.id !== 0 && isOwner)
                ? (
                  <div className="remove-image justify-content-center mb-4">
                    <Button onClick={() => handleDeleteImage(image.id)} variant="danger" type="submit">
                      REMOVE IMAGE
                    </Button>
                  </div>
                )
                : (<span />)
             )}
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="d-flex flex-column h-100 align-self-start">
          <div className="city-info mt-4">
            <p>
              <b>{renderType(place.description.location_type)}</b>
              :&nbsp;
              {place.description.address}
            </p>
            <h5>
              $
              {parseFloat(place.description.daily_price).toFixed(2)}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

HouseInfo.propTypes = {
  place: PropTypes.any,
  isOwner: PropTypes.bool.isRequired,
  isFav: PropTypes.bool.isRequired,
};

export default withRouter(HouseInfo);
