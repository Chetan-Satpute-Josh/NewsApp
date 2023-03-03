import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {ScreenName} from '../navigation';
import {ReduxStore} from '../redux/store';
import {NewsArticle} from '../api/news/types';
import {formatDate} from '../utils/dateUtils';
import useBookmark from '../hooks/useBookmark';
import {setViewed} from '../redux/news/newsSlice';
import {RootStackParamList} from '../navigation/types';

interface Props {
  article: NewsArticle;
}

const NewsCard = (props: Props) => {
  const article = props.article;

  const BookmarkButton = useBookmark(article);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();
  const isViewed = useSelector<ReduxStore, boolean>(
    state => state.news.viewed[props.article.url],
  );

  const publshingDate = new Date(article.publishedAt);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(setViewed(props.article.url));
        navigation.navigate(ScreenName.Article, {article: article});
      }}>
      <View
        className={`flex-row py-2 px-1 border-b border-b-neutral-600 ${
          isViewed ? 'opacity-70' : 'opacity-100'
        }`}>
        {article.urlToImage && (
          <View className="basis-1/4">
            <Image source={{uri: article.urlToImage}} style={styles.image} />
          </View>
        )}
        <View className="flex-1 pl-3">
          <Text className="text-md text-neutral-200 mb-4">{article.title}</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-neutral-500">
              {formatDate(publshingDate)}
            </Text>
            {BookmarkButton}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default NewsCard;
