import React, { Component } from 'react'
import { Image, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDB'
import moment from 'moment'
import numeral from 'numeral'
import Loading from '../components/Loading'
import EnlargeShrink from '../components/animations/EnlargeShrink'


class FilmDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: false,
        }
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.idFilm)

        if(favoriteFilmIndex !== -1) {
            const film = this.props.favoritesFilm[favoriteFilmIndex]
            this.setState({
                film
            }, () => {
                    this._updateNavigationOptions()
            })
            return
        }

        this.setState({ isLoading: true })
        getFilmDetailFromApi(this.props.route.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                }, () => {
                        this._updateNavigationOptions()
                })
            })
    }

    _updateNavigationOptions() {
        let headerRight = () => null
        if (this.state.film !== undefined && Platform.OS === 'ios') {
            headerRight = () => (
                <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../assets/images/share.ios.png')} />
                </TouchableOpacity>
            )
        }

        this.props.navigation.setOptions({
            title: `${this.state.film.title} (${moment(new Date(this.state.film.release_date)).format('YYYY')})`,
            headerRight
        })
    }

    _toggleFavorite() {
        this.props.dispatch({
            type: "TOGGLE_FAVORITE",
            value: this.state.film
        })
    }

    _displayFavoriteImage() {
        let src = require('../assets/images/favorite_border.png')
        let shouldEnlarge = false
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            src = require('../assets/images/favorite.png')
            shouldEnlarge = true
        }

        return (
            <EnlargeShrink shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={src}
                />
            </EnlargeShrink>
        )
    }

    _displayFilm() {
        const { film } = this.state
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
                        onPress={() => this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    _displayFloatingActionButton() {
        const { film } = this.state

        if (film !== undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../assets/images/share.png')} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Loading isLoading={ this.state.isLoading } full={true} />
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
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
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
})


export default connect(state => {
    const { favoritesFilm } = state
    return {
        favoritesFilm
    }
})(FilmDetail)
