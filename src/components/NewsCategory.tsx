import React from 'react';
import {ScrollView, Text, TouchableWithoutFeedback} from 'react-native';

import {Category} from '../api/news';
import {firstLetterUpper} from '../utils/stringUtils';

interface Props {
  category: Category;
  setCategory: (category: Category) => any;
  disableChange: boolean;
}

const NewsCategory = (props: Props) => {
  const categories = Object.values(Category).map(categoryName => (
    <TouchableWithoutFeedback
      key={categoryName}
      onPress={() => props.setCategory(categoryName)}
      disabled={props.disableChange}>
      <Text
        className={`p-1 p-3 px-5 bg-neutral-800 ${
          props.category === categoryName ? 'border-b-2 border-blue-500' : ''
        }`}>
        {firstLetterUpper(categoryName)}
      </Text>
    </TouchableWithoutFeedback>
  ));

  return (
    <ScrollView
      className="grow-0"
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {categories}
    </ScrollView>
  );
};

export default NewsCategory;
