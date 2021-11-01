import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regStatus: false,
    loginStatus: false,
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeRegStatus: (state, action) => {
            state.regStatus = action.payload;
        },
        changeLogStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
    }
})

export const { changeRegStatus, changeLogStatus } = AuthSlice.actions;

export default AuthSlice.reducer;