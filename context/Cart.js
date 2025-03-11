import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const CartContext = createContext();
const cartCookies = Cookies.get("cart");

const initialState = {
  cart: cartCookies
    ? JSON.parse(cartCookies)
    : { cartItems: [], shippingData: {}, paymentMethod: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEMS": {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item.title === existingItem.title ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      const cartData = { ...state.cart, cartItems };

      Cookies.set("cart", JSON.stringify(cartData));

      return { ...state, cart: cartData };
    }
    case "REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );

      const cartData = { ...state.cart, cartItems };

      Cookies.set("cart", JSON.stringify(cartData));

      return { ...state, cart: cartData };
    }
    case "SAVE_SHIPPING_DATA": {
      const cartData = {
        ...state.cart,
        shippingData: {
          ...state.cart.shippingData,
          ...action.payload,
        },
      };

      Cookies.set("cart", JSON.stringify(cartData));

      return { ...state, cart: cartData };
    }
    case "SAVE_PAYMENT_METHOD": {
      const cartData = {
        ...state.cart,
        paymentMethod: action.payload,
      };

      Cookies.set("cart", JSON.stringify(cartData));

      return { ...state, cart: cartData };
    }

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
