// AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import ProductsList from '../screens/ProductList';
import ProductDetails from '../screens/ProdcutDetials';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewProducts from '../screens/NewCart';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewProduct">
        <Stack.Screen name="ProductsList" component={ProductsList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="NewProduct" component={NewProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
