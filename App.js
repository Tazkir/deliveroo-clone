import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  TransitionPresets,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { NativeBaseProvider } from 'native-base';
import RestaurantScreen from './screens/RestaurantScreen';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreens from './screens/BasketScreens';
import PreparingOrderScreens from './screens/PreparingOrderScreens';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen
              name="Basket"
              component={BasketScreens}
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PreparingOrderScreens"
              component={PreparingOrderScreens}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
