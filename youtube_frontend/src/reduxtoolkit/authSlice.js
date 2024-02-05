import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("action ",action)
      state.userData = action.payload;
      state.userStatus = true;
    },
    logoutUser: (state, action) => {
      state.userData = null;
      state.userStatus = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
