import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenName} from '.';

export type RootStackParamList = {
  Home: undefined;
  Article: undefined;
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
