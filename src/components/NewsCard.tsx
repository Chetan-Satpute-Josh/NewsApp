import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {formatDate} from '../utils/dateUtils';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxStore} from '../redux/store';
import {NewsArticle, setBookmark, unsetBookmark} from '../redux/news/newsSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation';
import {RootStackParamList} from '../navigation/types';
import useBookmark from '../hooks/useBookmark';

interface Props {
  article: NewsArticle;
}

const NewsCard = (props: Props) => {
  const article = props.article;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const BookmarkButton = useBookmark(props.article);

  const publshingDate = new Date(article.publishedAt);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(ScreenName.Article, {article: article})
      }>
      <View className="flex-row py-2 px-1 border-b border-b-neutral-600">
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
