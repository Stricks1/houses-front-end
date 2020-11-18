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
/*
{
    "data": [
        {
            "id": "3",
            "type": "place",
            "attributes": {
                "location_type": 1,
                "address": "testing new information",
                "city": "Navengates",
                "country": "Brazil",
                "daily_price": "32.22"
            },
            "relationships": {
                "images": {
                    "data": []
                }
            }
        },
        {
            "id": "1",
            "type": "place",
            "attributes": {
                "location_type": 1,
                "address": "address test information",
                "city": "Blumenau",
                "country": "Brazil",
                "daily_price": "50.15"
            },
            "relationships": {
                "images": {
                    "data": [
                        {
                            "id": "1",
                            "type": "image"
                        },
                        {
                            "id": "3",
                            "type": "image"
                        }
                    ]
                }
            }
        }
    ],
    "included": [
        {
            "id": "1",
            "type": "image",
            "attributes": {
                "place_id": 1,
                "image_url": "https://s.concursosnobrasil.com.br/media/cache/f/prefeitura-de-blumenau-sc-960x540.jpg"
            }
        },
        {
            "id": "3",
            "type": "image",
            "attributes": {
                "place_id": 1,
                "image_url": "https://hotelgloria.com.br/wp-content/uploads/2019/07/hotel-gloria-blumenau-sc.jpg"
            }
        }
    ]
}
*/
const places = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_HOUSES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_HOUSES:
      //let placeStartArr = payload.data
      //let imagesStartArr = payload.included
      //let formatedReturn = []
      //placeStartArr.forEach(element => console.log(element));
      return {
        ...state,
        isFetching: false,
        places: payload,
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