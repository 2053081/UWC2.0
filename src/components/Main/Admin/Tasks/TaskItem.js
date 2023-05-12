import React, { useState } from "react";
import Modal from "../../../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

const TaskItem = (props) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const { task } = props;
  const { employeeId, mcpId, vehicleId, status } = task;

  const employee = useSelector((state) => state.users.allUsers).find(
    (employee) => employee.id === employeeId
  );
  const MCP = useSelector((state) => state.mcps.allMCPs).find(
    (MCP) => MCP.id === mcpId
  );
  const vehicle = useSelector((state) => state.vehicles.allVehicles).find(
    (vehicle) => vehicle.id === vehicleId
  );

  return (
    <div
      className={`w-[80%] md:w-[65%] mx-auto mt-3 p-3 shadow border-l-[4px] ${
        status === "pending" && "border-yellow-500"
      } ${status === "finished" && "border-green-500"}`}
    >
      <div className="flex justify-between">
        <span className="font-bold flex items-end">
          {employee.role.toUpperCase()}
        </span>
        <p
          className={`tracking-wider text-[0.75rem] font-sans p-1.5 rounded-lg font-bold bg-opacity-50 ${
            status === "pending" && "text-yellow-800 bg-yellow-200"
          } ${status === "finished" && "text-green-800 bg-green-200"}`}
        >
          {status}
        </p>
      </div>
      <p className="text-gray-500 text-sm my-2 line-clamp-1">{`MCP Location: ${
        MCP.location
      }, Employee Name: ${employee.name}, Vehicle: ${
        vehicle ? vehicle?.name : "Not Assigned"
      }`}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <p
          onClick={() => {
            setIsShowDetail(true);
          }}
          className="flex items-center cursor-pointer"
        >
          View More
          <FontAwesomeIcon className="pl-2" icon={faArrowRight} />
        </p>
        <FontAwesomeIcon
          onClick={props.onDeleteTask}
          className="cursor-pointer pr-2"
          icon={faTrashCan}
        />
      </div>
      {isShowDetail && (
        <Modal
          onCloseModal={() => {
            setIsShowDetail(false);
          }}
        >
          <h1 className="font-sans text-center text-[1.5rem] font-bold text-[#fe8a7d]">
            TASK DETAIL
          </h1>
          <div className="flex justify-between">
            <p className="flex items-end py-1">
              Task Classify:{" "}
              <span className="pl-1 font-bold">
                {employee.role.toUpperCase()}
              </span>
            </p>
            <p
              className={`tracking-wider text-[0.75rem] font-sans p-1.5 rounded-lg font-bold ${
                status === "pending" && "text-yellow-800 bg-yellow-200"
              } ${
                status === "finished" && "text-green-800 bg-green-200"
              } bg-opacity-50`}
            >
              {status}
            </p>
          </div>
          <p className="py-1">MCP Location: {MCP.location}</p>
          <div className="flex flex-wrap justify-between py-1">
            <p>Employee Name: {employee.name}</p>
            <p>
              Employee ID:{" "}
              <span className="font-bold text-blue-400">{`#${employee.id}`}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-between py-1">
            <p>Vehicle Name: {vehicle ? vehicle.name : "Not Assigned"}</p>
            <p>
              License Palate:{" "}
              <span className="font-bold text-blue-400">{`#${
                vehicle ? vehicle.liscense : "NULL"
              }`}</span>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskItem;
