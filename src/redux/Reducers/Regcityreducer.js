import {
  REG_CITIES,
  UPDATE_APOINTMNT,
  APOINTMENT_LOOKING,
  EDIT_PROFILECITIES,
  LOGOUT,
} from '../Types';

const initialState = {
  regcities: '',
  apoinrments: '',
  lookApointment: '',
  editprofilecities: '',
};
const RegistrationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REG_CITIES:
      return {...state, regcities: payload};
    case UPDATE_APOINTMNT:
      return {...state, apoinrments: payload};
    case APOINTMENT_LOOKING:
      return {...state, lookApointment: payload};
    case EDIT_PROFILECITIES:
      return {...state, editprofilecities: payload};

    case LOGOUT:
      return {...state, regcities: ''};
    default:
      return state;
  }
};
export default RegistrationReducer;
