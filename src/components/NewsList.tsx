import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import NewsCard from './NewsCard';
import {NewsArticle} from '../redux/news/newsSlice';

interface Props {
  articles: NewsArticle[];
  loading: boolean;
}

const NewsList = (props: Props) => {
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
        data={props.articles}
        renderItem={({item}) => <NewsCard article={item} />}
      />
    </View>
  );
};

export default NewsList;
