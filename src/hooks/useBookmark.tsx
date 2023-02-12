import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NewsArticle, setBookmark, unsetBookmark} from '../redux/news/newsSlice';
import {ReduxStore} from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

const useBookmark = (article: NewsArticle) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector<ReduxStore, boolean>(
    state => state.news.bookmarks[article.url] !== undefined,
  );

  const toggle = () => {
    if (isBookmarked) {
      dispatch(unsetBookmark(article));
    } else {
      dispatch(setBookmark(article));
    }
  };

  const bookmarkButton = (
    <Icon.Button
      name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
      color="#e5e5e5e5"
      size={20}
      backgroundColor="transparent"
      onPress={toggle}
    />
  );

  return bookmarkButton;
};

export default useBookmark;
