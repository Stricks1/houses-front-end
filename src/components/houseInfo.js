import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../index.css';
import { withRouter } from 'react-router-dom';

const HouseInfo = ({ place }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };

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
        <div className="d-flex flex-column h-100 justify-content-center">
          <div className="city-info mt-4">
            <p>{place.description.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(HouseInfo);