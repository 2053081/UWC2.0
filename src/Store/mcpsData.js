import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMCPs = createAsyncThunk("MCPs/getAllMCPs", async () => {
  return fetch("http://127.0.0.1:8080/api/v1/tasks/mcps")
    .then((response) => response.json())
    .then((mcps) => mcps.data);
});

const MCPsSlice = createSlice({
  name: "MCPs",
  initialState: {
    allMCPs: [],
  },
  reducers: {
    storeMCPs(state, action) {
      state.allMCPs = action.payload;
    },
    updateMCPsStatus(state, action) {
      const MCPIndex = state.allMCPs.findIndex(
        (mcp) => mcp.id === action.payload.id
      );
      state.allMCPs[MCPIndex].status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMCPs.fulfilled, (state, action) => {
      state.allMCPs = action.payload;
    });
  },
});

const MCPsReducer = MCPsSlice.reducer;

export const MCPssAction = MCPsSlice.actions;
export default MCPsReducer;
