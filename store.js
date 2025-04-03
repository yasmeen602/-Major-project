import { configureStore } from "@reduxjs/toolkit";
import autoSlice from "./authSlice";


const store = configureStore({
    reducer: {
        auth: autoSlice,
    },
});

export default store;

