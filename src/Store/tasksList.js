import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  return fetch("http://127.0.0.1:8080/api/v1/tasks")
    .then((response) => response.json())
    .then((tasks) => tasks.data);
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
  },
  reducers: {
    addTasks(state, action) {
      state.allTasks = [action.payload, ...state.allTasks];
    },
    deleteTask(state, action) {
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      );
    },
    updateTask(state, action) {
      const taskIndex = state.allTasks.findIndex(
        (task) => task.id === action.payload
      );
      console.log(taskIndex);
      state.allTasks[taskIndex].status = "finished";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.allTasks = action.payload;
    });
  },
});

const tasksReducer = tasksSlice.reducer;

export const tasksAction = tasksSlice.actions;
export default tasksReducer;
