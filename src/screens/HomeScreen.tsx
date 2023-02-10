import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="p-3">
        <Text className="font-bold text-lg text-neutral-200">NewsApp</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
