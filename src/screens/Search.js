import React, { Component } from 'react'
import { Button, Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../api/TMDB'
import FilmList from '../components/FilmList'
import Loading from '../components/Loading'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false,
        }
        this.searchedText = ''
        this.pagination = {
            current: 0,
            total: 0
        }

        // Permet d'appeler cette méthode dans d'autres components en étant bindé à celui-ci
        //this._loadFilms = this._loadFilms.bind(this)
    }

    // Private methods
    _loadFilms = () => {
        Keyboard.dismiss()
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.pagination.current + 1)
                .then(data => {
                    this.pagination = {
                        current: data.page,
                        total: data.total_pages
                    }
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false,
                    })
                })
        }
    }
    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    _searchFilms() {
        this.pagination = {
            current: 0,
            total: 0
        }
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    // Render
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={text => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Rechercher' onPress={() => this._searchFilms()} />

                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    pagination={this.pagination}
                    favoriteList={false}
                    isLoading={this.state.isLoading}
                    searchedText={this.searchedText}
                />

                <Loading
                    isLoading={this.state.isLoading}
                    full={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
})

export default Search
