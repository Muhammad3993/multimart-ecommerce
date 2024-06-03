// redux
import { configureStore } from "@reduxjs/toolkit"
// slices
import cartSlice from "./slices/cartSlice";


const store = configureStore({
    reducer: {
        cart: cartSlice
    }
})

export default store;