import React, { Component } from 'react';
import {
  Alert, Button, Keyboard, StyleSheet, TextInput, View
} from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../api/TMDB';
import FilmList from '../components/FilmList';
import Loading from '../components/Loading';
import { NetworkContext } from '../components/NetworkProvider';

class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
      isRefreshing: false
    };
    this.searchedText = '';
    this.pagination = {
      current: 0,
      total: 0,
    };

    // Permet d'appeler cette méthode dans d'autres components en étant bindé à celui-ci
    this.loadFilms = this.loadFilms.bind(this);
    this.initSearchFilms = this.initSearchFilms.bind(this);
  }

  // Private methods
  loadFilms() {
    Keyboard.dismiss();
    const { isConnected } = this.context;

    if (this.searchedText.length > 0) {
      if (!isConnected) {
        Alert.alert(
          'Non connecté',
          'Vous devez être connecté pour rechercher un film'
        );
      } else {
        this.setState({ isLoading: true });
        getFilmsFromApiWithSearchedText(
          this.searchedText,
          this.pagination.current + 1
        ).then((data) => {
          this.pagination = {
            current: data.page,
            total: data.total_pages,
          };
          this.setState((prevstate) => {
            return { films: [...prevstate.films, ...data.results] };
          });
          this.setState({
            isLoading: false,
            isRefreshing: false,
          });
        });
      }
    }
  }

  searchTextInputChanged(text) {
    this.searchedText = text;
  }

  initSearchFilms() {
    this.pagination = {
      current: 0,
      total: 0,
    };
    this.setState(
      {
        films: [],
      },
      () => {
        this.loadFilms();
      }
    );
  }

  // Render
  render() {
    const { films, isLoading, isRefreshing } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this.searchTextInputChanged(text)}
          onSubmitEditing={() => this.initSearchFilms()}
        />
        <Button title="Rechercher" onPress={() => this.initSearchFilms()} />

        <FilmList
          films={films}
          navigation={navigation}
          loadFilms={this.loadFilms}
          pagination={this.pagination}
          favoriteList={false}
          isLoading={isLoading}
          searchedText={this.searchedText}
          initSearchFilms={this.initSearchFilms}
          isRefreshing={isRefreshing}
        />

        <Loading isLoading={isLoading} full={false} />
      </View>
    );
  }
}

Search.contextType = NetworkContext;

const black = '#000';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: black,
    borderWidth: 1,
    paddingLeft: 5,
  },
});

export default Search;
