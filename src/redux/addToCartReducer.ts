// cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART_ITEMS,
  INCREASE_QUANTITY_TO_CART,
  DECREASE_QUANTITY_FROM_CART,
} from '../types';

interface CartItem {
  id: number;
  sku: string;
  name: string;
  price: string;
  quantity: number;
  original_price: string;
  total_quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const addToCartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case REMOVE_FROM_CART:
      const itemsToRemove = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => !itemsToRemove.includes(item.id),
        ),
      };
    // return {
    //   ...state,
    //   cartItems: state.cartItems.filter(
    //     itemId => itemId.id !== action.payload,
    //   ),
    // };
    case DECREASE_QUANTITY_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item: any) => {
            if (item.id === action.payload) {
              // Decrease the quantity by
              const updatedQuantity = item.quantity - 1;
              if (updatedQuantity === 0) {
                // If quantity becomes 0, remove the item from the cart
                return null;
              } else {
                // Update the quantity of the item
                return {
                  ...item,
                  quantity: updatedQuantity,
                };
              }
            } else {
              return item;
            }
          })
          .filter(Boolean), // Remove any null items from the array
      };
    case INCREASE_QUANTITY_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item: any) => {
          if (item.id === action.payload) {
            // Increase the quantity by 1
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        }),
      };
    case CLEAR_CART_ITEMS:
      console.log('run 2');
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default addToCartReducer;
