import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNewsByCategory} from '../hooks/useNews';
import NewsList from '../components/NewsList';
import NewsCategory from '../components/NewsCategory';

const HomeScreen = () => {
  const news = useNewsByCategory();

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-row justify-between p-3">
        <Text className="font-bold text-lg text-neutral-200">NewsApp</Text>
        <View className="flex-row">
          <Icon.Button name="search" backgroundColor="transparent" size={20} />
          <Icon.Button
            name="bookmarks"
            backgroundColor="transparent"
            size={20}
          />
        </View>
      </View>

      <NewsCategory
        category={news.category}
        setCategory={news.setCategory}
        disableChange={news.loading}
      />

      <NewsList urls={news.articleUrls} loading={news.loading} />
    </SafeAreaView>
  );
};

export default HomeScreen;
