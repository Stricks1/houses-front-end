import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { housesLoad } from '../actions/requestHouses';
import { favoritesLoad } from '../actions/requestFavorites';
import { IMAGES, PLACES } from '../helpers/constants';
import { sendAuthorizedRequest } from '../helpers/api';
import { CHANGE_MESS } from '../actions/messages';
import ModalRent from '../components/modalRent';
import HouseInfo from './houseInfo';
import loadImg from '../assets/loadImg.gif';

const HouseDetail = () => {
  const dispatch = useDispatch();
  const housesState = useSelector(state => state.houses);
  const favoritesState = useSelector(state => state.favorites);
  const usersState = useSelector(state => state.users);
  const message = useSelector(state => state.message);
  const [show, setShow] = useState(false);
  const history = useHistory();

  let urlImage = React.createRef();
  const { id } = useParams();
  const { places } = housesState;
  let place = false;
  let isOwner = false;
  if (places.places) {
    place = places.places.find(element => element.id === id);
    if (place) {
      isOwner = (place.description.user_id === usersState.user.id);
    }
  }

  const showModal = () => {
    const blur = document.getElementsByClassName('blurrable');
    let i;
    for (i = 0; i < blur.length; i += 1) {
      blur[i].classList.add('blur');
    }
    setShow(true);
  };

  const hideModal = () => {
    const unblur = document.getElementsByClassName('blurrable');
    let i;
    for (i = 0; i < unblur.length; i += 1) {
      unblur[i].classList.remove('blur');
    }
    setShow(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
      return;
    }
    dispatch(housesLoad());
    dispatch(favoritesLoad());
    if (show) {
      showModal();
    }
  }, [dispatch, history]);

  function createImage(imageObj) {
    try {
      const dataSent = {
        image: imageObj,
      };
      sendAuthorizedRequest('post', IMAGES, localStorage.getItem('token'), dataSent)
        .then(response => {
          if (response.data.data.type === 'image') {
            dispatch(housesLoad());
          } else {
            dispatch({
              type: CHANGE_MESS,
              payload: 'Error Creating Place',
            });
          }
        });
    } catch (error) {
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  }

  function testImage(url, timeoutT) {
    return new Promise(((resolve, reject) => {
      const timeout = timeoutT || 5000;
      let timer; const
        img = new Image();
      img.onerror = function error() {
        clearTimeout(timer);
        reject(new Error(false));
      };
      img.onabort = function error() {
        clearTimeout(timer);
        reject(new Error(false));
      };
      img.onload = function sucess() {
        clearTimeout(timer);
        resolve(true);
      };
      timer = setTimeout(() => {
        img.src = '//!!!!/test.jpg';
        reject(new Error(false));
      }, timeout);
      img.src = url;
    }));
  }

  async function runImage(image) {
    testImage(image.image_url).then(
      () => { createImage(image); },
      () => {
        dispatch({
          type: CHANGE_MESS,
          payload: 'URL not a valid Image',
        });
      },
    );
  }

  function handleDelete() {
    try {
      const path = `${PLACES}/${place.id}`;
      sendAuthorizedRequest('delete', path, localStorage.getItem('token'))
        .then(response => {
          if (response) {
            dispatch(housesLoad());
            history.push('/home');
          }
        });
    } catch (error) {
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  }

  function handleEdit() {
    history.push(`/edit/${place.id}`);
  }

  return (
    <>
      <ModalRent show={show} handleClose={hideModal} place={place.id} />
      <div className="blurrable">
        { (housesState.isFetching || favoritesState.isFetching)
          && (
          <div data-testid="loading" className="bg-load">
            <img className="image-load" src={loadImg} alt="loadingImage" />
          </div>
          )}
        { isOwner
          && (
            <div className="d-flex justify-content-center mb-4">
              <Button className="mr-4" onClick={() => handleDelete()} variant="danger" type="submit">
                REMOVE PLACE
              </Button>
              <Button className="ml-4" onClick={() => handleEdit()} variant="danger" type="submit">
                EDIT PLACE
              </Button>
            </div>
          )}
        { !housesState.isFetching && place && !favoritesState.isFetching
          && (
          <div className="d-flex justify-content-center flex-column align-items-center max-550 m-auto">
            <h1>Place</h1>
            <HouseInfo
              place={place}
              isOwner={isOwner}
              isFav={favoritesState.favorite.includes(parseInt(place.id, 10))}
            />
            <div className="px-4 w-100 max-550">
              <Button block size="lg" type="button" variant="info" onClick={showModal}>
                SCHEDULE RENT
              </Button>
            </div>
          </div>
          )}
        { isOwner
          && (
          <div className="m-4 max-550 m-auto">
            <Form
              className="my-4 px-4"
              onSubmit={e => {
                e.preventDefault();
                urlImage.classList.remove('error');
                if (!urlImage.value.trim()) {
                  urlImage.classList.add('error');
                  urlImage.focus();
                  return;
                }
                const image = {
                  image_url: urlImage.value,
                  place_id: place.id,
                };
                urlImage.value = '';
                runImage(image);
              }}
            >

              <Form.Group size="lg">
                <Form.Label>Add new Image URL</Form.Label>
                <Form.Control
                  ref={self => { (urlImage = self); }}
                  placeholder="Add URL image..."
                />
              </Form.Group>
              <Button variant="info" type="submit">
                Add Image
              </Button>
            </Form>
          </div>
          )}
        { message
          && (
          <div className="d-flex flex-column align-items-center mt-3 text-danger">
            <div>
              <span>
                <b>Error:&nbsp;</b>
              </span>
              <span>
                {message}
              </span>
            </div>
          </div>
          )}
      </div>
    </>
  );
};

export default HouseDetail;
