import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cartItems: savedCart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state,action){
        const product = action.payload
        const existingProduct = state.cartItems.find(item => item.id === product.id)
        if(existingProduct){
            existingProduct.quantity += product.quantity
        }else{
            state.cartItems.push(product)
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    incrementQuantity(state,action){
        const itemId = action.payload
        const product = state.cartItems.find((item)=>item.id === itemId)
        if(product && product.quantity < 10){
            product.quantity += 1
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    decrementQuantity(state,action){
        const itemId = action.payload
        const product = state.cartItems.find((item)=>item.id === itemId)
        if(product && product.quantity > 1){
            product.quantity -= 1
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    }
  },
});

export const selectedCart = (state) => state.cart.cartItems;
export const {addToCart, incrementQuantity, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;
