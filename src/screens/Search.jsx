/* global toast */
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  // TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getFilmsFromApiWithSearchedText } from '../api/TMDB';
import FilmList from '../components/FilmList';
import Loading from '../components/Loading';
import SearchRecents from '../components/SearchRecents';
// import AdvancedSearch from '../components/AdvancedSearch';
import { NetworkContext } from '../components/NetworkProvider';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
      isRefreshing: false,
      searchedText: '',
      // showAdvancedSearch: false,
    };
    this.pagination = {
      current: 0,
      total: 0,
    };

    // Permet d'appeler cette méthode dans d'autres components en étant bindé à celui-ci
    this.loadFilms = this.loadFilms.bind(this);
    this.initSearchFilms = this.initSearchFilms.bind(this);
    this.searchTextInputChanged = this.searchTextInputChanged.bind(this);
  }

  // Private methods
  loadFilms() {
    Keyboard.dismiss();
    const { isConnected } = this.context;
    const { searchedText } = this.state;

    if (searchedText.length > 0) {
      if (!isConnected) {
        Alert.alert(
          'Non connecté',
          'Vous devez être connecté pour rechercher un film'
        );
      } else {
        this.setState({ isLoading: true });
        getFilmsFromApiWithSearchedText(
          searchedText,
          this.pagination.current + 1
        )
          .then((data) => {
            this.pagination = {
              current: data.page,
              total: data.total_pages,
            };
            this.setState((prevstate) => {
              return { films: [...prevstate.films, ...data.results] };
            });
          })
          .catch((error) => {
            toast.show(`Erreur : ${error.message}`, { type: 'warning' });
          })
          .finally(() => {
            this.setState({
              isLoading: false,
              isRefreshing: false,
            });
          });
      }
    }
  }

  searchTextInputChanged(searchedText, callback = () => {}) {
    this.setState(
      {
        searchedText,
      },
      () => {
        callback();
      }
    );
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

  sendForm() {
    this.initSearchFilms();

    const { dispatch } = this.props;
    const { searchedText } = this.state;

    if (searchedText.length > 0) {
      dispatch({
        type: 'SAVE_SEARCH',
        value: searchedText,
      });
    }
  }

  displayInitButton() {
    const { searchedText } = this.state;

    if (searchedText.length > 0) {
      return (
        <TouchableHighlight
          onPress={() => {
            this.searchTextInputChanged('');
            this.initSearchFilms();
          }}
        >
          <Text style={styles.initbutton_text}>X</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  displayAdvancedSearch() {
    // eslint-disable-next-line no-unused-vars
    const { showAdvancedSearch } = this.state;
    return null;

    /* 
    if (showAdvancedSearch) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setState((prevstate) => {
                return {
                  showAdvancedSearch: !prevstate.showAdvancedSearch,
                };
              });
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>

          <AdvancedSearch />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState((prevstate) => {
            return {
              showAdvancedSearch: !prevstate.showAdvancedSearch,
            };
          });
        }}
      >
        <Text>[ Recherche avancée ]</Text>
      </TouchableOpacity>
    ); */
  }

  // Render
  render() {
    const {
      films, isLoading, isRefreshing, searchedText 
    } = this.state;
    const { dispatch, navigation, searches } = this.props;

    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <View style={styles.textcontrol}>
            <TextInput
              style={[
                styles.textinput,
                searchedText.length ? styles.textinput_withsearch : '',
              ]}
              placeholder="Titre du film"
              onChangeText={(text) => this.searchTextInputChanged(text)}
              onSubmitEditing={() => this.sendForm()}
              value={searchedText}
            />
            {this.displayInitButton()}
          </View>
        </View>

        {this.displayAdvancedSearch()}

        <Button title="Rechercher" onPress={() => this.sendForm()} />

        <FilmList
          films={films}
          navigation={navigation}
          loadFilms={this.loadFilms}
          pagination={this.pagination}
          favoriteList={false}
          isLoading={isLoading}
          searchedText={searchedText}
          initSearchFilms={this.initSearchFilms}
          isRefreshing={isRefreshing}
        />

        <SearchRecents
          searchedText={searchedText}
          searches={searches}
          initSearchFilms={this.initSearchFilms}
          searchTextInputChanged={this.searchTextInputChanged}
          dispatch={dispatch}
        />

        <Loading isLoading={isLoading} full={false} />
      </View>
    );
  }
}

Search.contextType = NetworkContext;

const black = '#000';
const white = 'white';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  search_container: {
    margin: 5,
    height: 50,
  },
  textcontrol: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
  },
  textinput: {
    flex: 2,
    height: 50,
    borderColor: black,
    borderWidth: 1,
    paddingLeft: 10,
  },
  textinput_withsearch: {
    borderRightWidth: 0,
  },
  initbutton_text: {
    color: white,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: black,
    width: 50,
    height: 50,
  },
});

export default connect((state) => {
  const { searches } = state.saveSearch;
  return {
    searches,
  };
})(Search);
