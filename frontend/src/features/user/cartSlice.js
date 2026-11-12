import { createSlice } from "@reduxjs/toolkit";

const savedCart = (JSON.parse(localStorage.getItem("cart")) || []).map((item) => {
  const price = Number(item.price) || 0;
  const quantity = Math.max(1, Number(item.quantity) || 1);
  return { ...item, price, quantity, subTotal: price * quantity };
});

const initialState = {
  cartItems: savedCart || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
        const product = action.payload;
        const existingProduct = state.cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            const maxQuantity = Math.min(10, Number(existingProduct.stock) || 10);
            if (existingProduct.quantity < maxQuantity) existingProduct.quantity += 1;
            existingProduct.subTotal = Number(existingProduct.price) * existingProduct.quantity;
        } else {
            const price = Number(product.price) || 0;
            const quantity = Math.max(1, Number(product.quantity) || 1);
            state.cartItems.push({ ...product, price, quantity, subTotal: price * quantity });
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
            product.subTotal = Number(product.price) * product.quantity
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    decrementQuantity(state,action){
        const itemId = action.payload
        const product = state.cartItems.find((item)=>item.id === itemId)
        if(product && product.quantity > 1){
            product.quantity -= 1
            product.subTotal = Number(product.price) * product.quantity
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    clearCart(state){
        state.cartItems = []
        localStorage.setItem("cart", JSON.stringify(state.cartItems))
    }
  },
});

export const selectedCart = (state) => state.cart.cartItems;
export const {addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
