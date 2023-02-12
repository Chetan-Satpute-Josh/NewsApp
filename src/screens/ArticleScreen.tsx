import React from 'react';
import {Button} from 'react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenURLButton from '../components/OpenURLButton';
import useBookmark from '../hooks/useBookmark';
import {ArticleScreenProps} from '../navigation/types';

const ArticleScreen = (props: ArticleScreenProps) => {
  const {article} = props.route.params;
  const BookmarkButton = useBookmark(article);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-row justify-between p-2 items-center">
        <Icon.Button
          name="arrow-back"
          backgroundColor="transparent"
          size={25}
          onPress={props.navigation.goBack}
        />
        {BookmarkButton}
      </View>
      <ScrollView className="flex-1 space-y-5">
        <View className="h-60">
          <Image source={{uri: article.urlToImage}} style={styles.image} />
        </View>

        <Text className="text-neutral-400 font-sm text-center px-2">
          {article.description}
        </Text>

        {article.content && (
          <Text className="text-neutral-200 p-2">{article.content}</Text>
        )}

        <View className="w-80 self-center mb-5 pt-3">
          <OpenURLButton title="View Article" url={article.url} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default ArticleScreen;
