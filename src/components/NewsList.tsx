import React from 'react';
import {FlatList, View, RefreshControl} from 'react-native';

import NewsCard from './NewsCard';
import {NewsArticle} from '../api/news/types';

interface Props {
  articles: NewsArticle[];
  loading: boolean;
  onRefresh: () => any;
}

const NewsList = (props: Props) => {
  return (
    <View className="flex-1">
      <FlatList
        data={props.loading ? [] : props.articles}
        renderItem={({item}) => <NewsCard article={item} />}
        refreshControl={
          <RefreshControl
            refreshing={props.loading}
            onRefresh={props.onRefresh}
            colors={['#e5e5e5']}
            progressBackgroundColor="#525252"
          />
        }
      />
    </View>
  );
};

export default NewsList;
