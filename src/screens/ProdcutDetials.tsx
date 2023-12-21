// components/ProductDetails.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {incrementQuantity, decrementQuantity} from '../redux/productAction';

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const productId = route.params?.productId;
  const product = useSelector((state: RootState) =>
    state.products.products.find(item => item.id === productId),
  );

  const handleIncrement = () => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(productId));
  };

  return (
    <View>
      {product && (
        <React.Fragment>
          <Text>{product.title}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Button title="Increase" onPress={handleIncrement} />
          <Button title="Decrease" onPress={handleDecrement} />
        </React.Fragment>
      )}
    </View>
  );
};

export default ProductDetails;
