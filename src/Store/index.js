import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersData";
import MCPsReducer from "./mcpsData";
import vehiclesReducer from "./vehicleData";
import tasksReducer from "./tasksList";
import CurrentUserReducer from "./CurrentUser";

const store = configureStore({
  reducer: {
    users: usersReducer,
    mcps: MCPsReducer,
    vehicles: vehiclesReducer,
    tasks: tasksReducer,
    currentUser: CurrentUserReducer,
  },
});

export default store;
