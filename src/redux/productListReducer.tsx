// cartReducer.js
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  INCREASE_QUANTITY_PRODUCT_TO_CART,
  DECREASE_QUANTITY_PRODUCT_FROM_CART,
  CLEAR_PRODUCT_ITEMS,
} from '../types';

const initialState = {
  productListItems: [],
};

const productListAddToCartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      // Check if the product is already in the cart
      const existingItem = state.productListItems.find(
        (item: any) => item.product_id === action.payload.product_id,
      );

      if (existingItem) {
        // Increment quantity
        return {
          ...state,
          productListItems: state.productListItems.map((item: any) =>
            item.product_id === action.payload.product_id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          productListItems: [
            ...state.productListItems,
            {...action.payload, quantity: 1},
          ],
        };
      }

    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        productListItems: state.productListItems.filter(
          (item: any) => item.product_id !== action.payload,
        ),
      };

    case DECREASE_QUANTITY_PRODUCT_FROM_CART:
      return {
        ...state,
        productListItems: state.productListItems.map((item: any) =>
          item.product_id === action.payload
            ? {...item, quantity: Math.max(item.quantity - 1, 0)}
            : item,
        ),
      };

    case INCREASE_QUANTITY_PRODUCT_TO_CART:
      return {
        ...state,
        productListItems: state.productListItems.map((item: any) =>
          item.product_id === action.payload
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };

    case CLEAR_PRODUCT_ITEMS:
      console.log('run 2');
      return {
        ...state,
        productListItems: [],
      };

    default:
      return state;
  }
};

export default productListAddToCartReducer;
