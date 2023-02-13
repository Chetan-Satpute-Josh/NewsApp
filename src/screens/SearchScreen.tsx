import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Country, NewsArticle} from '../api/news/types';

import NewsList from '../components/NewsList';
import useNews from '../api/news/hooks/useNews';
import {SearchScreenProps} from '../navigation/types';
const SearchScreen = (props: SearchScreenProps) => {
  const [inputValue, setInputValue] = useState('');
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const {loading, fetchNews} = useNews();

  const timeoutID = useRef<number | null>(null);

  const resetArticles = useCallback(async () => {
    const _articles = await fetchNews({q: inputValue, country: Country.INDIA});
    setArticles(_articles);
  }, [inputValue, fetchNews]);

  useEffect(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    if (inputValue === '') {
      setArticles([]);
    } else {
      timeoutID.current = setTimeout(resetArticles, 500);
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    };
  }, [timeoutID, resetArticles, setArticles, inputValue]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-row justify-between p-2 items-center border-b border-neutral-500">
        <Icon.Button
          name="arrow-back"
          backgroundColor="transparent"
          size={25}
          onPress={props.navigation.goBack}
        />
        <TextInput
          value={inputValue}
          placeholder="Search News"
          placeholderTextColor="#71717a"
          onChangeText={setInputValue}
          className="flex-1"
        />
      </View>

      <NewsList
        articles={articles}
        loading={loading}
        onRefresh={resetArticles}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
