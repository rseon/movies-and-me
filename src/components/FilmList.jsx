import React, { Component } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', { idFilm })
  }

  render() {
    if (this.props.isLoading && (!this.props.films || !this.props.films.length)) {
      return null
    }

    if (!this.props.favoriteList && (!this.props.searchedText || !this.props.searchedText.length)) {
      return <Text style={styles.enter_text}>Recherchez un film</Text>
    }

    if (!this.props.films || !this.props.films.length) {
      return <Text style={styles.no_result}>Aucun resultat</Text>
    }

    return (
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <FilmItem
              film={item}
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.pagination.current < this.props.pagination.total) {
              this.props.loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  no_result: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  },
  enter_text: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20
  }
})

export default connect(state => {
  const { favoritesFilm } = state
  return {
    favoritesFilm
  }
})(FilmList)