import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const products = [
  {id: 1, name: 'Product-1', price: 100},
  {id: 2, name: 'Product-2', price: 200},
  {id: 3, name: 'Product-3', price: 300},
];

const ProductList = ({cart, setCart}: any) => {
  // const [products, setProducts] = useState(Products);

  const handleAddToCart = (id: any) => {
    const existingProduct = cart.find((product: any) => product.id === id);
    if (existingProduct) {
      console.log('existingProduct', existingProduct);
      setCart(
        cart.map((product: any) =>
          product.id === id
            ? {...product, quantity: product.quantity + 1}
            : product,
        ),
      );
    } else {
      const productToAdd = products.find(product => product.id === id);
      setCart([...cart, {...productToAdd, quantity: 1}]);
    }
  };

  const handleRemoveFromCart = (id: any) => {
    const existingProduct = cart.find((product: any) => product.id === id);
    if (existingProduct.quantity === 1) {
      setCart(cart.filter((product: any) => product.id !== id));
    } else {
      setCart(
        cart.map((product: any) =>
          product.id === id
            ? {...product, quantity: product.quantity - 1}
            : product,
        ),
      );
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.productTextStyle}>{'Poducts'}</Text>
      {products.map(product => (
        <View key={product.id} style={styles.product}>
          <Text style={styles.listTextStyle}>{product.name}</Text>
          <Text style={styles.listTextStyle}>{product.price}</Text>
          <View style={styles.quantity}>
            <TouchableOpacity
              onPress={() => handleRemoveFromCart(product.id)}
              disabled={!cart.find((p: any) => p.id === product.id)?.quantity}>
              <Text style={styles.listTextStyle}>-</Text>
            </TouchableOpacity>
            <Text style={styles.listTextStyle}>
              {cart.find((p: any) => p.id === product.id)?.quantity || 0}
            </Text>
            <TouchableOpacity onPress={() => handleAddToCart(product.id)}>
              <Text style={styles.listTextStyle}>{'+'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const Cart = ({cart}: any) => {
  const total = cart.reduce(
    (acc: any, product: any) => acc + product.price * product.quantity,
    0,
  );

  if (cart.length === 0) {
    return <Text>{'No Product added to the cart'}</Text>;
  }

  return (
    <View style={styles.box}>
      <Text style={styles.cartTextStyle}>{'Cart'}</Text>
      {cart.map((product: any) => (
        <View key={product.id} style={styles.cartProduct}>
          <Text style={styles.listTextStyle}>{product.name}</Text>
          <Text style={styles.listTextStyle}>
            {product.quantity} x {product.price} ={' '}
            {product.quantity * product.price}
          </Text>
        </View>
      ))}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalTextStyle}>Total:</Text>
        <Text style={styles.totalTextStyle}>{total}</Text>
      </View>
    </View>
  );
};

const NewProducts = () => {
  const [cart, setCart] = useState([]);

  return (
    <View style={styles.container}>
      <ProductList cart={cart} setCart={setCart} />
      <Cart cart={cart} />
    </View>
  );
};
export default NewProducts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    flex: 1,
    padding: 10,
    borderWidth: 5,
  },
  product: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginVertical: 5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  cartProduct: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 5,
  },
  quantity: {
    backgroundColor: '#329ba8',
    flexDirection: 'row',
    width: 100,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalTextStyle: {
    color: 'white',
  },
  listTextStyle: {color: 'white'},
  productTextStyle: {textAlign: 'center'},
  cartTextStyle: {textAlign: 'center'},
  totalPriceContainer: {
    backgroundColor: 'grey',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
