import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import FilmList from '../components/FilmList'
import { connect } from 'react-redux'

class Favorites extends Component {

    render() {
        return (
          <FilmList
            films={this.props.favoritesFilm}
            navigation={this.props.navigation}
            favoriteList={true}
            initSearchFilms={() => {}}
            isRefreshing={false}
          />
        );
    }
}

const styles = StyleSheet.create({})

export default connect(state => {
    const { favoritesFilm } = state
    return {
        favoritesFilm
    }
})(Favorites)
