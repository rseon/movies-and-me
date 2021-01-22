import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toggleFavorite from './reducers/favoriteReducer';
import saveSearch from './reducers/searchReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default createStore(
  persistCombineReducers(rootPersistConfig, { toggleFavorite, saveSearch })
);
