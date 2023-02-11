import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NewsList from '../components/NewsList';
import {useNewsByQuery} from '../hooks/useNews';
import {SearchScreenProps} from '../navigation/types';

const SearchScreen = (props: SearchScreenProps) => {
  const [inputValue, setInputValue] = useState('');
  const news = useNewsByQuery();

  const timeoutID = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    timeoutID.current = setTimeout(() => {
      news.searchByQuery(inputValue);
    }, 500);

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    };
  }, [timeoutID, news, inputValue]);

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

      <NewsList urls={news.articleUrls} loading={news.loading} />
    </SafeAreaView>
  );
};

export default SearchScreen;
