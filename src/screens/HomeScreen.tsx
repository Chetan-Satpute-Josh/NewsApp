import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNewsByCategory} from '../hooks/useNews';
import NewsList from '../components/NewsList';
import NewsCategory from '../components/NewsCategory';
import {ScreenName} from '../navigation';
import {HomeScreenProps} from '../navigation/types';
import {useDispatch} from 'react-redux';
import {loadArticles} from '../redux/news/newsSlice';

const HomeScreen = (props: HomeScreenProps) => {
  const {articles, category, setCategory, loading} = useNewsByCategory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadArticles([category, articles]));
  }, [category, articles, dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-row justify-between p-3">
        <Text className="font-bold text-lg text-neutral-200">NewsApp</Text>
        <View className="flex-row">
          <Icon.Button
            name="search"
            backgroundColor="transparent"
            size={20}
            onPress={() => props.navigation.navigate(ScreenName.Search)}
          />
          <Icon.Button
            name="bookmarks"
            backgroundColor="transparent"
            size={20}
            onPress={() => props.navigation.navigate(ScreenName.Bookmark)}
          />
        </View>
      </View>

      <NewsCategory category={category} setCategory={setCategory} />

      <NewsList articles={articles} loading={loading} />
    </SafeAreaView>
  );
};

export default HomeScreen;
