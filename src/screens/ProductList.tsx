// // components/ProductsList.tsx
// import React from 'react';
// import {FlatList} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../redux/rootReducer';
// import {incrementQuantity, decrementQuantity} from '../redux/productAction';
// import ProductItem from '../components/ProductItem';

// const ProductsList: React.FC = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.products.products);

//   const handleIncrement = (productId: number) => {
//     dispatch(incrementQuantity(productId));
//   };

//   const handleDecrement = (productId: number) => {
//     dispatch(decrementQuantity(productId));
//   };

//   return (
//     <FlatList
//       data={products}
//       keyExtractor={item => item.id.toString()}
//       renderItem={({item}) => (
//         <ProductItem
//           product={item}
//           increment={handleIncrement}
//           decrement={handleDecrement}
//         />
//       )}
//     />
//   );
// };

// export default ProductsList;
// components/ProductsList.tsx
import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../components/ProductItem';

const ProductsList: React.FC = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector((state: RootState) => state.products.products);

  const handleItemPress = (productId: number) => {
    navigation.navigate('ProductDetails', {productId});
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ProductItem product={item} onPress={() => handleItemPress(item.id)} />
      )}
    />
  );
};

export default ProductsList;
