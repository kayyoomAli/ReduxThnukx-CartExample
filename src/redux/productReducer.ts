// reducers/productsReducer.ts
import {Product} from '../types/type';

interface ProductsState {
  products: Product[];
}

type ProductsAction =
  | {type: 'SET_PRODUCTS'; payload: Product[]}
  | {type: 'INCREMENT_QUANTITY'; payload: number}
  | {type: 'DECREMENT_QUANTITY'; payload: number};

const initialState: ProductsState = {
  products: [],
};

const productsReducer = (
  state = initialState,
  action: ProductsAction,
): ProductsState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.map(product => ({...product, quantity: 0})),
      };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? {...product, quantity: (product.quantity || 0) + 1}
            : product,
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload && (product.quantity || 0) > 0
            ? {...product, quantity: (product.quantity || 0) - 1}
            : product,
        ),
      };
    default:
      return state;
  }
};

export default productsReducer;
