import {CITIES_LIST, SEARCH_FRIENDS, LOGOUT} from '../Types';

const initialState = {
  cities: '',
  searrchfriends: '',
};

const Citiesreducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CITIES_LIST:
      return {cities: payload};
    case SEARCH_FRIENDS:
      return {...state, searrchfriends: payload};
    case LOGOUT:
      return state;
    default:
      return state;
  }
};
export default Citiesreducer;
