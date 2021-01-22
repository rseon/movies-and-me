import React, { Component } from 'react';
import {
  Alert, FlatList, Pressable, StyleSheet, Text, View,
} from 'react-native';

class SearchRecents extends Component {
  displaySearchList() {
    const {
      dispatch,
      initSearchFilms,
      searches,
      searchedText,
      searchTextInputChanged,
    } = this.props;

    const { length } = searches;

    if (length > 0 && !searchedText) {
      return (
        <View style={styles.recents_container}>
          <Text style={styles.title}>Recherches récentes</Text>
          <FlatList
            data={searches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  searchTextInputChanged(item, () => {
                    initSearchFilms();
                  });
                }}
                onLongPress={() => {
                  Alert.alert(
                    'Supprimer',
                    'Voulez-vous supprimer cette recherche ?',
                    [
                      {
                        text: 'Oui',
                        onPress: () => {
                          dispatch({
                            type: 'REMOVE_SEARCH',
                            value: item,
                          });
                        },
                      },
                      {
                        text: 'Non',
                        style: 'cancel',
                      },
                    ]
                  );
                }}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : '',
                    borderBottomWidth: index === (length - 1) ? 0 : 1,
                  },
                ]}
              >
                <Text>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <>
        {this.displaySearchList()}
      </>
    );
  }
}

const gray = '#ddd';

const styles = StyleSheet.create({
  recents_container: {
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  item: {
    padding: 5,
    borderBottomColor: gray,
  },
});

export default SearchRecents;
