import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVehicles = createAsyncThunk(
  "vehicles/getAllVehicles",
  async () => {
    const res = await fetch("http://127.0.0.1:8080/api/v1/tasks/vehicles")
      .then((response) => response.json())
      .then((vehicles) => vehicles.data);

    return res;
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    allVehicles: [],
  },
  reducers: {
    storeVehicles(state, action) {
      state.allVehicles = action.payload;
    },
    updateVehiclesStatus(state, action) {
      const vehicleIndex = state.allVehicles.findIndex(
        (vehicle) => vehicle.id === action.payload.id
      );
      state.allVehicles[vehicleIndex].status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVehicles.fulfilled, (state, action) => {
      state.allVehicles = action.payload;
    });
  },
});

const vehiclesReducer = vehiclesSlice.reducer;

export const vehiclesAction = vehiclesSlice.actions;
export default vehiclesReducer;
