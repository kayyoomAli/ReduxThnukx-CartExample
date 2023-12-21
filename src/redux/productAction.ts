// actions/productsActions.ts
import axios from 'axios';
import {Dispatch} from 'redux';
import {ProductsResponse} from '../types/type';

interface SetProductsAction {
  type: 'SET_PRODUCTS';
  payload: ProductsResponse['products'];
}

interface IncrementQuantityAction {
  type: 'INCREMENT_QUANTITY';
  payload: number;
}

interface DecrementQuantityAction {
  type: 'DECREMENT_QUANTITY';
  payload: number;
}

export type ProductsActionTypes =
  | SetProductsAction
  | IncrementQuantityAction
  | DecrementQuantityAction;

const setProducts = (
  products: ProductsResponse['products'],
): SetProductsAction => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      const response = await axios.get<ProductsResponse>(
        'https://dummyjson.com/products',
      );
      dispatch(setProducts(response.data.products));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};

export const incrementQuantity = (
  productId: number,
): IncrementQuantityAction => ({
  type: 'INCREMENT_QUANTITY',
  payload: productId,
});

export const decrementQuantity = (
  productId: number,
): DecrementQuantityAction => ({
  type: 'DECREMENT_QUANTITY',
  payload: productId,
});
