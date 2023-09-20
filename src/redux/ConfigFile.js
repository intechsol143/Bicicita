import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Combinereducer';
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'Citiesreducer',
    'friendsReducer',
    'RegcityReducer',
    'AppReducer',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(Store);

module.exports = {Store, persistor};
