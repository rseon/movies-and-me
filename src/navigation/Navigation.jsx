import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import Search from '../screens/Search';
import FilmDetail from '../screens/FilmDetail';
import Favorites from '../screens/Favorites';
import Test from '../screens/Test';
import DifferentStyles from '../screens/Test/DifferentStyles';
import Animations from '../screens/Test/Animations';

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Rechercher' }}
      />
      <SearchStack.Screen
        name="FilmDetail"
        component={FilmDetail}
      />
    </SearchStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator();
function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favoris' }}
      />
      <FavoritesStack.Screen
        name="FilmDetail"
        component={FilmDetail}
      />
    </FavoritesStack.Navigator>
  );
}

const TestStack = createStackNavigator();
function TestStackScreen() {
  return (
    <TestStack.Navigator>
      <TestStack.Screen
        name="Test"
        component={Test}
        options={{ title: 'Quelques tests' }}
      />
      <TestStack.Screen
        name="TestDifferentStyles"
        component={DifferentStyles}
        options={{ title: 'Différent styles' }}
      />
      <TestStack.Screen
        name="TestAnimations"
        component={Animations}
        options={{ title: 'Animations' }}
      />
    </TestStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const imgSearch = require('../assets/images/search.png');
const imgFavorite = require('../assets/images/favorite.png');

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#DDDDDD',
          inactiveBackgroundColor: '#FFFFFF',
          showLabel: true,
          showIcon: true
        }}
      >
        <Tab.Screen
          name="Test"
          component={TestStackScreen}
          options={{
            tabBarLabel: 'Tests'
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => {
              return (
                <Image
                  source={imgSearch}
                  style={styles.icon}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStackScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => {
              return (
                <Image
                  source={imgFavorite}
                  style={styles.icon}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});
