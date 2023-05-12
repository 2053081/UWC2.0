import { createSlice } from "@reduxjs/toolkit";

const initialUserCurrentState = {
  isLogin: false,
  id: -1,
};

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialUserCurrentState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.id = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.id = -1;
    },
  },
});

const CurrentUserReducer = CurrentUserSlice.reducer;
export const currentUserAction = CurrentUserSlice.actions;
export default CurrentUserReducer;
