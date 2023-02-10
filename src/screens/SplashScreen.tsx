import React, {useEffect, useRef} from 'react';
import {SafeAreaView, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SplashScreen = () => {
  const opacityValue = useRef(new Animated.Value(0));
  const translateValue = useRef(new Animated.Value(50));

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(opacityValue.current, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateValue.current, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-neutral-900">
      <AnimatedIcon
        name="newspaper-o"
        size={80}
        color={'#e5e5e5e5'}
        className="mb-5"
        style={{opacity: opacityValue.current}}
      />

      <Animated.Text
        className="text-5xl text-neutral-200 font-bold"
        style={{
          opacity: opacityValue.current,
          transform: [{translateY: translateValue.current}],
        }}>
        NewsApp
      </Animated.Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
