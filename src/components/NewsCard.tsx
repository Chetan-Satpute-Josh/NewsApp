import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet} from 'react-native';
import {formatDate} from '../utils/dateUtils';

interface Props {
  title: string;
  source: string;
  publishedAt: string;
  urlToImage: string;
}

const NewsCard = (props: Props) => {
  const publshingDate = new Date(props.publishedAt);

  return (
    <View className="flex-row py-2 px-1 border-b border-b-neutral-600">
      {props.urlToImage && (
        <View className="basis-1/4">
          <Image source={{uri: props.urlToImage}} style={styles.image} />
        </View>
      )}
      <View className="flex-1 pl-3">
        <Text className="text-md text-neutral-200 mb-4">{props.title}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-neutral-500">{formatDate(publshingDate)}</Text>
          <Icon.Button
            name="bookmark"
            color="#e5e5e5e5"
            size={20}
            backgroundColor="transparent"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default NewsCard;
