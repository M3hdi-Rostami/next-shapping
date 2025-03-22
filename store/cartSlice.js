import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const cartCookies = Cookies.get("cart");
function updateCookies(data) {
  Cookies.set("cart", JSON.stringify(data));
}

const initialState = {
  cartItems: cartCookies ? [...JSON.parse(cartCookies).cartItems] : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item?.title === newItem?.title
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((item) => {
          return item?.title === newItem?.title
            ? { ...newItem, qty: item?.qty + 1 }
            : item;
        });
      } else {
        state.cartItems.push({ ...newItem, qty: 1 });
      }

      updateCookies({ cartItems: state.cartItems });
    },
    removeFromCart: (state, action) => {
      const newItem = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item?.title !== newItem?.title
      );
      updateCookies({ cartItems: state.cartItems });
    },
    addShippingData: (state, action) => {
      state = { ...state, shippingData: action.payload };
      updateCookies({ ...state,  });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

