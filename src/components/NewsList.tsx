import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, FlatList, View} from 'react-native';

import NewsCard from './NewsCard';
import {ReduxStore} from '../redux/store';
import {NewsArticle} from '../redux/news/newsSlice';

interface Props {
  urls: string[];
  loading: boolean;
}

const NewsList = (props: Props) => {
  const articles = useSelector<ReduxStore, NewsArticle[]>(state =>
    props.urls.map(url => state.news.articles[url]),
  );

  if (props.loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <NewsCard
            title={item.title}
            source={item.source.name}
            publishedAt={item.publishedAt}
            urlToImage={item.urlToImage}
          />
        )}
      />
    </View>
  );
};

export default NewsList;
