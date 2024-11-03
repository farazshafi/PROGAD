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
            existingProduct.subTotal += product.subTotal
        }else{
            state.cartItems.push(product)
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    removeFromCart(state,action){
        const productId = action.payload
        const newCartItems = state.cartItems.filter(item => item.id !== productId)
        state.cartItems = newCartItems
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    incrementQuantity(state,action){
        const itemId = action.payload
        const product = state.cartItems.find((item)=>item.id === itemId)
        if(product && product.quantity < 10 && product.stock > product.quantity){
            product.quantity += 1
            product.subTotal += product.price
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    decrementQuantity(state,action){
        const itemId = action.payload
        const product = state.cartItems.find((item)=>item.id === itemId)
        if(product && product.quantity > 1){
            product.quantity -= 1
            product.subTotal -= product.price
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    }
  },
});

export const selectedCart = (state) => state.cart.cartItems;
export const {addToCart, incrementQuantity, decrementQuantity, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
