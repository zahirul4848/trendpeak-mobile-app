import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  shippingInfo: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state)=> {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action)=> {
      const item = action.payload.item;
      const existItem = state.cart.find(x=> x._id === item._id);
      if(existItem) {
        state.cart = [...state.cart.map(x=> x._id === existItem._id ? item : x)];
      } else {
        state.cart = [...state.cart, item];
      }
    },
    removeFromCart: (state, action)=> {
      state.cart = state.cart.filter(item=> item._id !== action.payload._id);
    },
    increaseCount: (state, action)=> {
      state.cart = state.cart.map((item)=> {
        if(item._id === action.payload._id && item.count < item.stock) {
          item.count++;          
        }
        return item;
      })
    },
    decreaseCount: (state, action)=> {
      state.cart = state.cart.map((item)=> {
        if(item._id === action.payload._id && item.count > 1) {
          item.count--;
        }
        return item;
      })
    },
    resetCart: (state)=> {
      state.cart = [];
    },
    setShippingInfo: (state, action)=> {
      state.shippingInfo = action.payload.shippingInfo;
    },
    resetShippingInfo: (state)=> {
      state.shippingInfo = {};
    }
  },
});

export const {
  setIsCartOpen,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setShippingInfo,
  resetCart,
  resetShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;