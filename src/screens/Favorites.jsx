import React from 'react';
import { connect } from 'react-redux';
import FilmList from '../components/FilmList';

const Favorites = ({ favoritesFilm, navigation }) => {
  return (
    <FilmList
      films={favoritesFilm}
      navigation={navigation}
      favoriteList
      initSearchFilms={() => {}}
      isRefreshing={false}
    />
  );
};

export default connect((state) => {
  const { favoritesFilm } = state;
  return {
    favoritesFilm
  };
})(Favorites);
