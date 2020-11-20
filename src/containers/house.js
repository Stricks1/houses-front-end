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
    console.log('call create image')
    try {
      const urlCall = URL + IMAGES;
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
        console.log('veio response')
        console.log(response)
        if (response.data.data.type === "image") {
            console.log('response dispatch')
          dispatch(housesLoad());
          console.log('response change page')
          history.push('/')
          return
        } else {
            console.log('response error')
          dispatch({
            type: CHANGE_MESS,
            payload: "Error Creating Place",
          });
        }
      });
    } catch (error) {
        console.log('veio error')
        console.log(error)
      dispatch({
        type: CHANGE_MESS,
        payload: error,
      });
    }
  };

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
          <Button block size="lg" type="button" variant="danger">
            RENT
          </Button>
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
               console.log(image)
              //createImage(image);
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
              <b>Error:</b> 
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
