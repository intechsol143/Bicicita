import {
  USERS,
  UPDATED_USER,
  NULLBADGE,
  TOKEN,
  LOGOUT,
  IEMAIL,
  UPDATE_BADGE,
} from '../Types';

const initialState = {
  iEmail: '',
  user: null,
  fcmToken: '',
  badge: 0,
};
const Stackreducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USERS:
      return {...state, user: payload};
    case IEMAIL:
      return {...state, iEmail: payload};
    case UPDATED_USER:
      return {...state, user: payload};
    case TOKEN:
      return {...state, fcmToken: payload};
    case UPDATE_BADGE:
      return {...state, badge: payload};
    case NULLBADGE:
      return {...state, badge: payload};
    case LOGOUT:
      return {...state, user: null};
    default:
      return state;
  }
};

export default Stackreducer;
