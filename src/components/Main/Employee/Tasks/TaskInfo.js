import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapLocation,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { tasksAction } from "../../../../Store/tasksList";

const TaskInfo = ({ userTask }) => {
  const allUsers = useSelector((state) => state.users.allUsers);
  const allMCPs = useSelector((state) => state.mcps.allMCPs);
  const allVehicles = useSelector((state) => state.vehicles.allVehicles);

  const { employeeId, mcpId, vehicleId, type, id: taskId, status } = userTask;
  const taskUserInfo = allUsers.find((user) => user.id === employeeId);
  const taskMCPInfo = allMCPs.find((mcp) => mcp.id === mcpId);
  const taskVehicleInfo = allVehicles.find(
    (vehicle) => vehicle.id === vehicleId
  );

  const [isCheckOutTask, setIsCheckOutTask] = useState(
    status === "finished" ? true : false
  );
  const dispatch = useDispatch();

  const checkOutTaskHandler = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      "http://127.0.0.1:8080/api/v1/tasks/update/" + taskId,
      requestOptions
    );

    dispatch(tasksAction.updateTask(taskId));

    setIsCheckOutTask((prev) => !prev);
  };

  return (
    <Fragment>
      <h1 className="mt-[6rem] mb-4 text-center font-bold text-[2rem]">
        Task Information
      </h1>
      <div
        className={`max-w-[80%] md:max-w-[70%] mx-auto shadow p-4 border-l-[4px] ${
          !isCheckOutTask && "border-yellow-200"
        } ${isCheckOutTask && "border-green-200"}`}
      >
        <div className="flex justify-end">
          <span
            className={`font-bold tracking-wider text-[0.75rem] p-1.5 rounded-md font-sans bg-opacity-50 ${
              !isCheckOutTask && "bg-yellow-200 text-yellow-800"
            } ${isCheckOutTask && "bg-green-200 text-green-800"}`}
          >
            {!isCheckOutTask && "PENDING"}
            {isCheckOutTask && "FINISHED"}
          </span>
        </div>
        <h2 className="mt-2 text-slate-500 font-bold border-b-[2px] border-slate-400 flex gap-3 items-center">
          <FontAwesomeIcon icon={faUser} />
          EMPLOYEE, {`(${type.toUpperCase()})`}
        </h2>
        <div className="block lg:flex justify-between gap-4">
          <p className="mt-2">{`Name: ${taskUserInfo.name}`}</p>
          <p className="mt-2">
            Employee ID:{" "}
            <span className="font-bold text-blue-500">{`#${taskUserInfo.id}`}</span>
          </p>
        </div>
        <div className="block lg:flex justify-between gap-4">
          <p className="mt-2">{`Email: ${taskUserInfo.email}`}</p>
          <p className="mt-2">{`Phone Number: ${taskUserInfo.phone}`}</p>
        </div>

        <h2 className="mt-2 text-slate-500 font-bold border-b-[2px] border-slate-400 flex gap-3 items-center">
          <FontAwesomeIcon icon={faMapLocation} />
          MCPs
        </h2>
        <p className="mt-2">{`Location: ${taskMCPInfo.location}`}</p>
        <p className="mt-2">{`Address: ${taskMCPInfo.address}`}</p>

        {type === "collector" && (
          <Fragment>
            <h2 className="mt-2 text-slate-500 font-bold border-b-[2px] border-slate-400 flex gap-3 items-center">
              <FontAwesomeIcon icon={faTruck} />
              VEHICLE
            </h2>
            <div className="block lg:flex justify-between gap-4">
              <p className="mt-2">{`Name: ${taskVehicleInfo.name}`}</p>
              <p className="mt-2">{`Type: ${taskVehicleInfo.vehiclesType}`}</p>
            </div>
            <div className="block lg:flex justify-between gap-10">
              <p className="mt-2">
                liscense:{" "}
                <span className="font-bold text-blue-500">{`#${taskVehicleInfo.liscense}`}</span>
              </p>
              <p className="mt-2">
                Insurer ID:{" "}
                <span className="font-bold text-blue-500">{`#${taskVehicleInfo["insurer-id"]}`}</span>
              </p>
            </div>
          </Fragment>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={checkOutTaskHandler}
            disabled={isCheckOutTask}
            className={`${
              isCheckOutTask
                ? "bg-slate-300 text-slate-500"
                : "bg-[#263544] text-white"
            } p-2 rounded-md font-bold`}
          >
            Checkout Task
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskInfo;
