import { 
    LOAD_HOUSES,
    RECEIVE_HOUSES,
    ERROR_FETCHING_HOUSES
} from '../actions/requestHouses';

const initialState = {
  isFetching: false,
  places: [{}],
  status: '',
};

const places = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_HOUSES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_HOUSES:
      let objectFormated = []
      payload.data.forEach(element => {
          let imgArr = []
          element.relationships.images.data.forEach(element2 => {
            payload.included.forEach(images => {
              if (parseInt(images.id, 10) === parseInt(element2.id, 10) ){
                let imgSingle = { id: element2.id, url: images.attributes.image_url }
                imgArr.push(imgSingle)
              }
            })
          })
          let singlePlace = { images: imgArr, description: element.attributes, id: element.id}
          objectFormated.push(singlePlace)
        }
      );
      const arrPlacesFormated = { places: objectFormated }
      return {
        ...state,
        isFetching: false,
        places: arrPlacesFormated,
      };
    case ERROR_FETCHING_HOUSES:
      return {
        ...state,
        isFetching: false,
        places: payload,
      };

    default:
      return state;
  }
};

export default places;
