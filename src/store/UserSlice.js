import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
}


export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        recordUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { recordUser } = UserSlice.actions;

export default UserSlice.reducer;


// { 
//     account: {
//         address: null,
//         city: null,
//         country: null,
//         createdAt: "2021-08-26T20:37:34.978Z",
//         email: "tony@as",
//         fullName: "Tony Stark",
//         id: 744,
//         phone: "+38000000000",
//         updatedAt: "2021-08-26T20:37:34.978Z",
//     },
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0NCwiaWF0IjoxNjMwMDEwMjU0OTgxLCJzdWIiOiJBUElfQVVUSE9SSVpBVElPTl9UT0tFTiJ9.au3EevahnJdKNGk3OaFu2xbbOJTBPGvmRhMjJutWJbY",
// },