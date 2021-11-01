import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: "",
    countproducts: 12,
    categoryList: [],
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        recordProducts: ( state, action ) => {
            state.products = action.payload;  
        },
        setCountProducts: (state, action) => {
            state.countproducts = action.payload;
        },
        recordCategoryList: (state, action) => {
            state.categoryList = action.payload;
        },
    }
})

export const { recordProducts, setCountProducts, recordCategoryList } = productsSlice.actions;

export default productsSlice.reducer;