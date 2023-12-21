// // components/ProductItem.tsx
// import React from 'react';
// import {View, Text} from 'react-native';
// import {Product} from '../types/type';

// interface ProductItemProps {
//   product: Product;
//   increment: (productId: number) => void;
//   decrement: (productId: number) => void;
// }

// const ProductItem: React.FC<ProductItemProps> = ({
//   product,
//   increment,
//   decrement,
// }) => {
//   return (
//     <View>
//       <Text>{product.title}</Text>
//       <Text onPress={() => increment(product.id)}>-</Text>
//       <Text>Quantity: {product.quantity}</Text>
//       <Text onPress={() => decrement(product.id)}>+</Text>
//     </View>
//   );
// };

// export default ProductItem;
// components/ProductItem.tsx
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Product} from '../types/type';

interface ProductItemProps {
  product: Product;
  onPress: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({product, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{alignSelf: 'center'}}>
        <Image
          source={{uri: product.thumbnail}}
          style={{width: 150, height: 150}}
        />
        <Text>{product.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
