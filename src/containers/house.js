import axios from 'axios';
import React, { useEffect }  from 'react';
import { useParams} from "react-router";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { housesLoad } from '../actions/requestHouses';
import { URL, IMAGES } from '../helpers/constants';
import { CHANGE_MESS } from '../actions/messages';
import HouseInfo from '../components/houseInfo';
import loadImg from '../assets/loadImg.gif';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const HouseDetail = () => {
  const dispatch = useDispatch();
  const housesState = useSelector(state => state.houses);
  const usersState = useSelector(state => state.users);
  const message = useSelector(state => state.message);

  let urlImage
  let { id } = useParams();
  const { places } = housesState
  let place = false
  let isOwner = false
  if (places.places) {
    place = places.places.find(element => element.id === id);
    isOwner = (place.description.user_id === usersState.user.id ? true : false)
  }
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")){
      history.push('/login')
      return
    }
    dispatch(housesLoad());
  }, [dispatch, history]);

  function createImage(imageObj) {
    try {
      const urlCall = URL + IMAGES;
      console.log(urlCall)
      axios
      .post(
        urlCall,
        {
          image: imageObj
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
          }
        }
      )
      .then(response => {
        if (response.data.data.type === "image") {
          dispatch(housesLoad());
        } else {
          dispatch({
            type: CHANGE_MESS,
            payload: "Error Creating Place",
          });
        }
      });
    } catch (error) {
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  };

  function testImage(url, timeoutT) {
    return new Promise(function (resolve, reject) {
      var timeout = timeoutT || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject(false);
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve(true);
      };
      timer = setTimeout(function () {
        img.src = "//!!!!/test.jpg";
        reject(false);
      }, timeout);
      img.src = url;
    });
  }

  async function runImage(image) {
    testImage(image.image_url).then(
      () => { createImage(image) },
      () => { 
        dispatch({
          type: CHANGE_MESS,
          payload: "URL not a valid Image",
        })
    });
  }

  return (
    <div>
      { housesState.isFetching
        && (
        <div data-testid="loading" className="bg-load">
          <img className="image-load" src={loadImg} alt="loadingImage" />
        </div>
        )}
      { !housesState.isFetching && place &&
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h1>House</h1>
          <HouseInfo place={place} />
          <div className="px-4 w-100">
            <Button block size="lg" type="button" variant="danger">
              RENT
            </Button>
          </div>
        </div>
      }
      { isOwner &&
        <div className="m-4">
          <Form
            onSubmit={e => {
              e.preventDefault()
              urlImage.classList.remove('error');
              if (!urlImage.value.trim()) {
                urlImage.classList.add('error');
                urlImage.focus()
                return
              }
              let image = {
                image_url: urlImage.value,
                place_id: place.id
              }
              urlImage.value = ''
              runImage(image)
            }}
          >
          
          <Form.Group size="lg" controlId="address">
            <Form.Label>Add new Image URL</Form.Label>
            <Form.Control ref={self => (urlImage = self)} 
              placeholder="Add URL image..."
            />
            </Form.Group>
            <Button variant="info" type="submit">
              Add Image
            </Button>
          </Form>
        </div>
      }
      { message && 
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
      }
    </div>
  );
}

export default HouseDetail;
