import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favouriteList : "",

}

export const FavouriteSlice = createSlice({
    name:"favourite",
    initialState,
    reducers: {
        recordFavourite: (state, action) => {
            state.favouriteList = action.payload;
        },
    }
});

export const { recordFavourite } = FavouriteSlice.actions;

export default FavouriteSlice.reducer;