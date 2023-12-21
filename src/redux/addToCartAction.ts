// cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS';
export const INCREASE_QUANTITY_TO_CART = 'INCREASE_QUANTITY_TO_CART';
export const DECREASE_QUANTITY_FROM_CART = 'DECREASE_QUANTITY_FROM_CART';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY_TO_CART,
  DECREASE_QUANTITY_FROM_CART,
  CLEAR_CART_ITEMS,
} from '../types';

export const addToCart = (item: any) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: any) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const decreaseQuantity = (itemId: any) => {
  return {
    type: DECREASE_QUANTITY_FROM_CART,
    payload: itemId,
  };
};

export const increaseQuantity = (itemId: any) => {
  return {
    type: INCREASE_QUANTITY_TO_CART,
    payload: itemId,
  };
};
export const clearCartItems = () => ({
  type: CLEAR_CART_ITEMS,
});
