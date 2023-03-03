import {useStore} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NewsList from '../components/NewsList';

import {ReduxStore} from '../redux/store';
import {NewsArticle} from '../api/news/types';
import {BookmarkScreenProps} from '../navigation/types';

const BookmarkScreen = (props: BookmarkScreenProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const store = useStore<ReduxStore>();

  useEffect(() => {
    const state = store.getState();
    setArticles(Object.values(state.news.bookmarks));
  }, [store]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-row justify-between p-2 items-center border-b border-neutral-500">
        <Icon.Button
          name="arrow-back"
          backgroundColor="transparent"
          size={25}
          onPress={props.navigation.goBack}
        />
        <Text className="font-bold text-lg text-neutral-200">Bookmarks</Text>
      </View>

      <NewsList articles={articles} loading={false} onRefresh={() => {}} />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
