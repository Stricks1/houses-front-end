import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegistration } from '../actions/requestUsers';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loadImg from '../assets/loadImg.gif';

const CreatePlaceForm = () => {
  let locationType
  let address
  let city
  let country
  let dailyPrice
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);
  let history = useHistory();

  useEffect(() => {
    if (userState.user.username) {
      history.push('/')
      return
    }
  }, [history, userState.user.username]);


  return (
    <div>
      { userState.isFetching && 
        (
          <div data-testid="loading" className="bg-load">
            <img className="image-load" src={loadImg} alt="loadingImage" />
          </div>
        )
      }
      { !userState.isFetching && 
      (<div className="Login">
        <Form
          onSubmit={e => {
            e.preventDefault()
            address.classList.remove('error');
            city.classList.remove('error');
            country.classList.remove('error');
            dailyPrice.classList.remove('error');
            if (!dailyPrice.value.trim()) {
              dailyPrice.classList.add('error');
            }
            if (!country.value.trim()) {
              country.classList.add('error');
            }
            if (!city.value.trim()) {
              city.classList.add('error');
            }
            if (!address.value.trim()) {
              address.classList.add('error');
              address.focus()
              return
            }
            if (!city.value.trim()) {
              city.focus()
              return
            }
            if (!country.value.trim()) {
              country.focus()
              return
            }
            if (!dailyPrice.value.trim()) {
              dailyPrice.focus()
              return
            }
            let place = {
              location_type: locationType.current.value,
              address: address.value,
              city: city.value,
              country: country.value,
              daily_price: dailyPrice.value,
            }
            //dispatch(userRegistration(user));
          }}
        >
        <Form.Group size="lg" controlId="username">
          <Form.Label>Type Location</Form.Label>
          <Form.Control
            as="select"
            custom
            ref={self => (locationType = self)}
          >
            <option value="1">House</option>
            <option value="2">Apartment</option>
            <option value="3">Room</option>
          </Form.Control>
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Description</Form.Label>
          <Form.Control ref={self => (address = self)} 
            placeholder="Type Description..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>City</Form.Label>
          <Form.Control ref={self => (city = self)} 
            placeholder="City..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ConfirmPassword">
          <Form.Label>Country</Form.Label>
          <Form.Control ref={self => (country = self)} 
            placeholder="Country..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ConfirmPassword">
          <Form.Label>Daily Price</Form.Label>
          <Form.Control type='number' step="0.01" ref={self => (dailyPrice = self)} 
            placeholder="Daily Price..."
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Add Place
        </Button>
        </Form>
      </div>)
      }
    </div>
  )
}


export default CreatePlaceForm;