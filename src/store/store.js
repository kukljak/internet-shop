import { configureStore } from "@reduxjs/toolkit";
import recordProductsReducer from "./ProductsSlice";
import recordUserReducer from "./UserSlice";
import loaderReducer from "./LoaderSlice";
import AuthReducer from "./AuthSlice";
import FavouriteReducer from "./FavouriteSlice";

export const store = configureStore({
    reducer: {
        productList: recordProductsReducer,
        userInfo: recordUserReducer,
        loader: loaderReducer,
        auth: AuthReducer,
        favourite: FavouriteReducer,
    },
})