import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const res = await fetch("http://127.0.0.1:8080/api/v1/users")
    .then((response) => response.json())
    .then((users) => users.data.results);

  return res;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },
  reducers: {
    storeUsers(state, action) {
      state.allUsers = action.payload;
    },
    updateUserStatus(state, action) {
      const userIndex = state.allUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      state.allUsers[userIndex].status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;

export const usersAction = usersSlice.actions;
export default usersReducer;
