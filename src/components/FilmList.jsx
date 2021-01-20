import React, { Component } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import FilmItem from './FilmItem';

class FilmList extends Component {

  _displayDetailForFilm = (idFilm) => {
    const { navigation } = this.props;
    navigation.navigate('FilmDetail', { idFilm });
  }

  render() {
    const {
      favoriteList,
      initSearchFilms,
      isLoading,
      isRefreshing,
      films,
      loadFilms,
      pagination,
      searchedText,
    } = this.props;

    if (isLoading && (!films || !films.length)) {
      return null;
    }

    if (!favoriteList && (!searchedText || !searchedText.length)) {
      return <Text style={styles.enter_text}>Recherchez un film</Text>;
    }

    if (!films || !films.length) {
      return <Text style={styles.no_result}>Aucun resultat</Text>;
    }

    return (
      <FlatList
        style={styles.list}
        data={films}
        extraData={favoriteList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            isFilmFavorite={
              favoriteList.findIndex((film) => film.id === item.id) !== -1
            }
            displayDetailForFilm={this.displayDetailForFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!favoriteList && pagination.current < pagination.total) {
            loadFilms();
          }
        }}
        refreshing={isRefreshing}
        onRefresh={() => {
          initSearchFilms();
        }}
      />
    );
  }
}

const red = 'red';
const blue = 'blue';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  no_result: {
    color: red,
    textAlign: 'center',
    marginTop: 20,
  },
  enter_text: {
    color: blue,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default connect((state) => {
  const { favoritesFilm } = state;
  return {
    favoritesFilm
  };
})(FilmList);
