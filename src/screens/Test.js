import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import HelloWorld from './Test/HelloWorld'

class Test extends React.Component {

    render() {
        return (
            <View style={styles.main_container}>
                <Button title="Différents styles" onPress={() => this.props.navigation.navigate('TestDifferentStyles')} />

                <Button title="Animations" onPress={() => this.props.navigation.navigate('TestAnimations')} />
                
                <View style={{ marginTop: 20 }}>
                    <HelloWorld />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Test