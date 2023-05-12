import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faTruck,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { usersAction } from "../../../../Store/usersData";
import { vehiclesAction } from "../../../../Store/vehicleData";
import { MCPssAction } from "../../../../Store/mcpsData";

const CreateTasksForm = (props) => {
  const [taskFormRole, setTaskFormRol] = useState("collector");
  const [MCPsOptionValue, setMCPsOptionValue] = useState(null);
  const [employeeOptionValue, setemployeeOptionValue] = useState(null);
  const [vehicleOptionValue, setVehicleOptionValue] = useState(null);

  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.users.allUsers);
  const availableJanitor = allUsers.filter((employee) => {
    return employee.status === "Available" && employee.role === "janitor";
  });
  const availableCollector = allUsers.filter((employee) => {
    return employee.status === "Available" && employee.role === "collector";
  });

  const allVehicles = useSelector((state) => state.vehicles.allVehicles);
  const availableVehicles = allVehicles.filter((vehicle) => {
    return vehicle.status === "available";
  });

  const allMCPs = useSelector((state) => state.mcps.allMCPs);
  const MCPsFull = allMCPs.filter((MCP) => {
    return MCP.status === "full";
  });
  const MCPsEmpty = allMCPs.filter((MCP) => {
    return MCP.status === "empty";
  });

  const submitTaskFormHandler = (e) => {
    e.preventDefault();

    if (taskFormRole === "collector") {
      if (!MCPsOptionValue || !employeeOptionValue || !vehicleOptionValue)
        return;

      dispatch(
        usersAction.updateUserStatus({
          id: availableCollector[employeeOptionValue].id,
          status: "Pending task",
        })
      );

      dispatch(
        MCPssAction.updateMCPsStatus({
          id: MCPsFull[MCPsOptionValue].id,
          status: "progress",
        })
      );

      dispatch(
        vehiclesAction.updateVehiclesStatus({
          id: availableVehicles[vehicleOptionValue].id,
          status: "pending task",
        })
      );
    } else if (taskFormRole === "janitor") {
      if (!MCPsOptionValue || !employeeOptionValue) return;

      dispatch(
        usersAction.updateUserStatus({
          id: availableJanitor[employeeOptionValue].id,
          status: "Pending task",
        })
      );

      dispatch(
        MCPssAction.updateMCPsStatus({
          id: MCPsEmpty[MCPsOptionValue].id,
          status: "progress",
        })
      );
    }

    let taskInfo = {
      id: Math.random(),
      status: "pending",
      type: taskFormRole,
      employeeId:
        taskFormRole === "collector"
          ? availableCollector[employeeOptionValue].id
          : availableJanitor[employeeOptionValue].id,
      mcpId:
        taskFormRole === "collector"
          ? MCPsFull[MCPsOptionValue].id
          : MCPsEmpty[MCPsOptionValue].id,
      vehicleId: availableVehicles[vehicleOptionValue]?.id,
    };

    props.onCreateTask(taskInfo);

    props.onCloseModal();
  };

  return (
    <form onSubmit={submitTaskFormHandler}>
      <h1 className="font-sans text-center text-[1.5rem] font-bold text-[#fe8a7d]">
        {taskFormRole.toUpperCase()} TASK FORM
      </h1>
      <p className="text-[0.75rem] text-gray-500 text-center">
        Create task for{" "}
        <span
          onClick={() => setTaskFormRol("janitor")}
          className="font-bold text-black hover:underline cursor-pointer underline-offset-2"
        >
          JANITOR
        </span>{" "}
        or{" "}
        <span
          onClick={() => setTaskFormRol("collector")}
          className="font-bold text-black hover:underline cursor-pointer underline-offset-2"
        >
          COLLECTOR
        </span>
      </p>
      <div className="mb-3">
        <h2 className="font-bold text-gray-700 border-b-2 border-b-slate-400 py-2">
          <FontAwesomeIcon className="pr-2" icon={faMapLocation} />
          MCPs
        </h2>
        <select
          defaultValue={`Select ${
            taskFormRole === "collector" ? "full" : "empty"
          } MCPs`}
          required
          onChange={(e) => {
            setMCPsOptionValue(e.currentTarget.value);
          }}
          className="p-2 w-full shadow rounded-md mt-2 focus:outline-blue-400"
        >
          <option disabled className="bg-slate-400 text-white">
            Select {taskFormRole === "collector" ? "full" : "empty"} MCPs
          </option>
          {taskFormRole === "collector" &&
            MCPsFull.map((MCP, index) => {
              return (
                <option value={index} key={index}>
                  {MCP.location}
                </option>
              );
            })}
          {taskFormRole === "janitor" &&
            MCPsEmpty.map((MCP, index) => {
              return (
                <option value={index} key={index}>
                  {MCP.location}
                </option>
              );
            })}
        </select>
      </div>
      <div className="mb-3">
        <h2 className="font-bold text-gray-700 border-b-2 border-b-slate-400 py-2">
          <FontAwesomeIcon className="pr-2" icon={faUsers} />
          {taskFormRole.toUpperCase()}
        </h2>
        <select
          defaultValue={`Select available ${taskFormRole}`}
          required
          onChange={(e) => {
            setemployeeOptionValue(e.currentTarget.value);
          }}
          className="p-2 w-full shadow rounded-md mt-2 focus:outline-blue-400"
        >
          <option disabled className="bg-slate-400 text-white">
            Select available {taskFormRole}
          </option>
          {taskFormRole === "collector" &&
            availableCollector.map((employee, index) => {
              return (
                <option
                  value={index}
                  key={index}
                >{`${employee.name}, ${employee.id}`}</option>
              );
            })}
          {taskFormRole === "janitor" &&
            availableJanitor.map((employee, index) => {
              return (
                <option
                  value={index}
                  key={index}
                >{`${employee.name}, ${employee.id}`}</option>
              );
            })}
        </select>
      </div>
      {taskFormRole === "collector" && (
        <div className="mb-3">
          <h2 className="font-bold text-gray-700 border-b-2 border-b-slate-400 py-2">
            <FontAwesomeIcon className="pr-2" icon={faTruck} />
            VEHICLE
          </h2>
          <select
            defaultValue="Select available vehicle"
            required
            onChange={(e) => {
              setVehicleOptionValue(e.currentTarget.value);
            }}
            className="p-2 w-full shadow rounded-md mt-2 focus:outline-blue-400"
          >
            <option disabled className="bg-slate-400 text-white">
              Select available vehicle
            </option>
            {availableVehicles.map((vehicle, index) => {
              return (
                <option
                  value={index}
                  key={index}
                >{`${vehicle.name}, ${vehicle.liscense}`}</option>
              );
            })}
          </select>
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="p-2 bg-[#263544] text-white font-medium rounded-md shadow"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CreateTasksForm;
