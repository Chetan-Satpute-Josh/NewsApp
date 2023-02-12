import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenName} from '.';
import {NewsArticle} from '../redux/news/newsSlice';

export type RootStackParamList = {
  Home: undefined;
  Article: {article: NewsArticle};
  Search: undefined;
  Bookmark: undefined;
  Splash: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Home
>;

export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Search
>;

export type BookmarkScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Bookmark
>;

export type ArticleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.Article
>;
