import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: savedUser || null,
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
        isVerified:action.payload.isVerified,
        token: action.payload.token,
      };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    verifyUser(state) {
      state.user.isVerified = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const selectedUser = (state) => state.user.user;
export const { setUser, verifyUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
