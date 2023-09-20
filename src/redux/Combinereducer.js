import {combineReducers} from 'redux';

import AppReducer from './Reducers/appReducer';
import Citiesreducer from './Reducers/Citiesreducer';
import RegcityReducer from './Reducers/Regcityreducer';
import stakreducer from './Reducers/stackreducer';
import friendsReducer from './Reducers/friendsReducer';

const rootReducer = combineReducers({
  AppReducer,
  stakreducer,
  Citiesreducer,
  RegcityReducer,
  friendsReducer,
});

export default rootReducer;
