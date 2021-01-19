import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

class Loading extends Component {

    _displayLoading() {
        if (this.props.isLoading) {
            return (
                <View style={ this.props.full ? styles.loading_full : styles.loading }>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
    }

    render() {
        return (
            <>
                { this._displayLoading() }
            </>
        )
    }
}

const styles = StyleSheet.create({
    loading_full: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loading
