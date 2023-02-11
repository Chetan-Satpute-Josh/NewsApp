import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import ArticleScreen from '../screens/ArticleScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

import {ReduxStore} from '../redux/store';
import {RootStackParamList} from './types';
import {setShowSplashScreen} from '../redux/status/statusSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();

export enum ScreenName {
  Home = 'Home',
  Article = 'Article',
  Search = 'Search',
  Bookmark = 'Bookmark',
  Splash = 'Splash',
}

const AppNavigation = () => {
  const showSplashScreen = useSelector<ReduxStore, boolean>(
    state => state.status.showSplashScreen,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => dispatch(setShowSplashScreen(false)), 3000);

    return () => clearTimeout(id);
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Splash}
      screenOptions={{headerShown: false}}>
      {showSplashScreen && (
        <Stack.Screen name={ScreenName.Splash} component={SplashScreen} />
      )}
      <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
      <Stack.Screen name={ScreenName.Article} component={ArticleScreen} />
      <Stack.Screen name={ScreenName.Search} component={SearchScreen} />
      <Stack.Screen name={ScreenName.Bookmark} component={BookmarkScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
