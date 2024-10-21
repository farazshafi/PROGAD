import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
import adminReducer from "../features/admin/adminSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer,
        admin: adminReducer,
    }
})