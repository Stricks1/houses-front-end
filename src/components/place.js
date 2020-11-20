import React from 'react';
import '../index.css';
import { withRouter, Link } from 'react-router-dom';

const Place = ({ place }) => {
  const {
    id, description, images,
  } = place;
  if (images.length === 0) {
    const fillerImg = { url: 'https://dummyimage.com/600x500/ffffff/000000.png&text=NO+IMAGE' };
    images.push(fillerImg);
  }
  return (
    <div className="single-card-container">
      <Link className="text-decoration-none" to={`/house/${id}`} id="link-detail">
        <div className="image-container">
          <img className="card-image" src={images[0].url} alt={description.address} />
        </div>
        <div className="d-flex-around title-card d-flex justify-content-around align-items-center">
          <div className="city-loc">
            <span>
              {`${description.city} - ${description.country}`}
            </span>
          </div>
          <div className="d-flex flex-column price-info align-items-center">
            <span>
              $
              {' '}
              {parseFloat(description.daily_price).toFixed(2)}
            </span>
            <span className="small-label">
              per Day
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(Place);
