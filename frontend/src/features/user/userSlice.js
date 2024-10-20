import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: null,
    name: null,
    email: null,
    isAdmin: false,
    phoneNumber: null,
    isVerified: false,
    token:null
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        isAdmin: action.payload.isAdmin,
        phoneNumber: action.payload.phoneNumber,
        token: action.payload.token
      };
    },
    verifyUser(state){
        state.user.isVerified = true
    },
    logoutUser(state){
      state.user = initialState.user;
    }
  },
});

export const selectedUser = (state) => state.user.user;
export const {setUser,verifyUser,logoutUser} = userSlice.actions;
export default userSlice.reducer
