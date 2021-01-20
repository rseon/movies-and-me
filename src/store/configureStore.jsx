import { createStore } from 'redux';
import toggleFavorite from './reducers/favoriteReducer'

export default createStore(
  toggleFavorite,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
