import { SafeAreaView } from 'react-native';
import SafeViewAndroid from '../components/SafeViewAndroid';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreens = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      className="bg-gray-50 flex-1 items-center justify-center"
      style={SafeViewAndroid.AndroidSafeArea}
    >
      <Animatable.Image
        source={require('../assets/orderLoading.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        direction="alternate"
        className="text-lg my-10 text-[#d84300] font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#d84300" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreens;
