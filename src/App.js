import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import { useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./Store/usersData";
import { getAllMCPs } from "./Store/mcpsData";
import { getAllVehicles } from "./Store/vehicleData";
import { getAllTasks } from "./Store/tasksList";
import EmployeePage from "./pages/EmployeePage";
import { useSelector } from "react-redux";

const libraries = ["places"];

function App() {
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.currentUser.isLogin);

  useJsApiLoader({
    googleMapsApiKey: "AIzaSyAextcUAVctnrK7qDOcjGkpzFXr1AtOnBg",
    libraries,
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllVehicles());
    dispatch(getAllMCPs());
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="login" element={<AuthPage />} />
      {loginStatus && <Route path="backofficer" element={<AdminPage />} />}
      {loginStatus && <Route path="employee" element={<EmployeePage />} />}
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
}

export default App;
