import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NewsList from '../components/NewsList';
import NewsCategory from '../components/NewsCategory';

import {ScreenName} from '../navigation';
import {ReduxStore} from '../redux/store';
import useNews from '../api/news/hooks/useNews';
import {HomeScreenProps} from '../navigation/types';
import {loadArticles} from '../redux/news/newsSlice';
import {Category, Country, NewsArticle} from '../api/news/types';

const HomeScreen = (props: HomeScreenProps) => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const {loading, fetchNews} = useNews();

  const dispatch = useDispatch();
  const articles = useSelector<ReduxStore, NewsArticle[]>(state =>
    Object.values(state.news.articles[category]),
  );

  const resetArticles = useCallback(
    async (_category: Category) => {
      const _articles = await fetchNews({
        category: _category,
        country: Country.INDIA,
      });

      dispatch(loadArticles([_category, _articles]));
    },
    [dispatch, fetchNews],
  );

  useEffect(() => {
    if (articles.length === 0) {
      resetArticles(category);
    }
  }, [resetArticles, category, articles.length]);

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

      <NewsList
        articles={articles}
        loading={loading}
        onRefresh={() => resetArticles(category)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
