import React, { Component } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDB';
import Loading from '../components/Loading';
import EnlargeShrink from '../components/animations/EnlargeShrink';
import { NetworkContext } from '../components/NetworkProvider';

// eslint-disable-next-line import/no-unresolved
const imgShare = require('../assets/images/share.png');
const imgShareIos = require('../assets/images/share.ios.png');
const imgFavoriteBorder = require('../assets/images/favorite_border.png');
const imgFavorite = require('../assets/images/favorite.png');

class FilmDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { favoritesFilm, navigation, route } = this.props;
    const { isConnected } = this.context;

    const favoriteFilmIndex = favoritesFilm.findIndex(
      (item) => item.id === route.params.idFilm
    );

    if (favoriteFilmIndex !== -1) {
      const film = favoritesFilm[favoriteFilmIndex];
      this.setState(
        {
          film,
        },
        () => {
          this.updateNavigationOptions();
        }
      );
      return;
    }

    if (!isConnected) {
      Alert.alert(
        'Non connecté',
        'Vous devez être connecté pour voir le détail du film'
      );
      navigation.goBack();
    } else {
      this.setState({ isLoading: true });
      getFilmDetailFromApi(route.params.idFilm).then((data) => {
        this.setState(
          {
            film: data,
            isLoading: false,
          },
          () => {
            this.updateNavigationOptions();
          }
        );
      });
    }
  }

  updateNavigationOptions() {
    let headerRight = () => null;
    const { film } = this.state;
    const { navigation } = this.props;

    if (film !== undefined && Platform.OS === 'ios') {
      headerRight = () => (
        <TouchableOpacity
          style={styles.share_touchable_headerrightbutton}
          onPress={() => this.shareFilm()}
        >
          <Image style={styles.share_image} source={imgShareIos} />
        </TouchableOpacity>
      );
    }

    navigation.setOptions({
      title: `${film.title} (${moment(
        new Date(film.release_date)
      ).format('YYYY')})`,
      headerRight,
    });
  }

  toggleFavorite() {
    const { dispatch } = this.props;
    const { film } = this.state;

    dispatch({
      type: 'TOGGLE_FAVORITE',
      value: film,
    });
  }

  displayFavoriteImage() {
    const { favoritesFilm } = this.props;
    const { film } = this.state;
    let src = imgFavoriteBorder;
    let shouldEnlarge = false;
    if (favoritesFilm.findIndex((item) => item.id === film.id) !== -1) {
      src = imgFavorite;
      shouldEnlarge = true;
    }

    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image style={styles.favorite_image} source={src} />
      </EnlargeShrink>
    );
  }

  displayFilm() {
    const { film } = this.state;
    if (film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this.toggleFavorite()}
          >
            {this.displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le
            {' '}
            {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note :
            {' '}
            {film.vote_average}
            {' '}
            / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes :
            {' '}
            {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget :
            {' '}
            {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :
            {' '}
            {film.genres
              .map((genre) => {
                return genre.name;
              })
              .join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :
            {' '}
            {film.production_companies
              .map((company) => {
                return company.name;
              })
              .join(' / ')}
          </Text>
        </ScrollView>
      );
    }

    return null;
  }

  shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  }

  displayFloatingActionButton() {
    const { film } = this.state;

    if (film !== undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this.shareFilm()}
        >
          <Image
            style={styles.share_image}
            source={imgShare}
          />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.main_container}>
        <Loading isLoading={isLoading} full />
        {this.displayFilm()}
        {this.displayFloatingActionButton()}
      </View>
    );
  }
}

FilmDetail.contextType = NetworkContext;

const black = '#000';
const gray = '#666666';
const orange = '#e91e63';

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: black,
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: gray,
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30,
  },
  share_touchable_headerrightbutton: {
    marginRight: 8,
  },
});

export default connect((state) => {
  const { favoritesFilm } = state.toggleFavorite;
  return {
    favoritesFilm
  };
})(FilmDetail);
