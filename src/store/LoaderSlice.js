import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loader: false
};

const LoaderSlice = createSlice({
    name:"loader",
    initialState,
    reducers: {
        changeLoaderStatus: (state, action) => {
            state.loader = action.payload;   
        },
    }
})

export const { changeLoaderStatus } = LoaderSlice.actions;

export default LoaderSlice.reducer;