import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SearchScreen from '../screens/SearchScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator();

export const ScreenName: Record<keyof RootStackParamList, string> = {
  Home: 'Home',
  Article: 'Article',
  Search: 'Search',
  Bookmark: 'Bookmark',
  Splash: 'Splash',
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Splash}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenName.Splash} component={SplashScreen} />
      <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
      <Stack.Screen name={ScreenName.Article} component={ArticleScreen} />
      <Stack.Screen name={ScreenName.Search} component={SearchScreen} />
      <Stack.Screen name={ScreenName.Bookmark} component={BookmarkScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
