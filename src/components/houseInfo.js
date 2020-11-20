import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_MESS } from '../actions/messages';
import Carousel from 'react-bootstrap/Carousel';
import '../index.css';
import { withRouter } from 'react-router-dom';

// <button className="d-flex mx-auto">Teste</button>

const HouseInfo = ({ place }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  if (place.images.length === 0) {
    const fillerImg = { url: 'https://dummyimage.com/600x500/ffffff/000000.png&text=NO+IMAGE' };
    place.images.push(fillerImg);
  }
  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };

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
        <div>
          <span className="favClick">Add Favorite</span>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={20000}
        >
          {place.images.map(image => (
            <Carousel.Item key={image.id}>
              <img
                className="d-block w-100"
                src={image.url}
                alt={image.id}
              />
              <Carousel.Caption />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="d-flex flex-column h-100 align-self-start">
          <div className="city-info mt-4">
            <p>{place.description.address}</p>
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
export default withRouter(HouseInfo);
