import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const VehiclesDataTable = (props) => {
  const { singleRowData } = props;
  const allUsers = useSelector((state) => state.users.allUsers);
  const insurer = allUsers.find(
    (user) => user.id === singleRowData["insurer-id"]
  );

  return (
    <Fragment>
      <td className="p-3 whitespace-nowrap font-bold text-blue-400">
        {`#${singleRowData.liscense}`}
      </td>
      <td className="p-3 whitespace-nowrap">{singleRowData.name}</td>
      <td className="p-3 whitespace-nowrap">{singleRowData.vehiclesType}</td>
      <td className="p-3 whitespace-nowrap">
        {insurer ? insurer.name : "NULL"}
      </td>
      <td className="p-3 whitespace-nowrap">{singleRowData.area}</td>
      <td className="p-3 whitespace-nowrap">
        <span
          className={`${
            singleRowData.status === "available" &&
            "text-green-800 bg-green-200"
          } ${
            singleRowData.status === "unavailable" && "text-red-800 bg-red-200"
          } ${
            singleRowData.status === "pending task" &&
            "text-yellow-800 bg-yellow-200"
          } p-1.5 font-bold text-center rounded-lg bg-opacity-50 font-sans text-[0.75rem] tracking-wider`}
        >
          {singleRowData.status.toUpperCase()}
        </span>
      </td>
    </Fragment>
  );
};

export const VehiclesDataCard = (props) => {
  const { singleRowData } = props;
  const allUsers = useSelector((state) => state.users.allUsers);
  const insurer = allUsers.find(
    (user) => user.id === singleRowData["insurer-id"]
  );

  return (
    <div key={singleRowData.id} className="bg-white shadow p-4 rounded-md my-3">
      <div className="flex justify-between flex-wrap">
        <p>{singleRowData.name}</p>
        <p className="font-bold text-blue-400">{`#${singleRowData.liscense}`}</p>
      </div>
      <div className="flex justify-between py-2 flex-wrap">
        <p>{singleRowData.vehiclesType}</p>
        <p>{insurer ? insurer.name : "NULL"}</p>
      </div>
      <div className="flex justify-between">
        <span
          className={`${
            singleRowData.status === "available" &&
            "text-green-800 bg-green-200"
          } ${
            singleRowData.status === "unavailable" && "text-red-800 bg-red-200"
          } ${
            singleRowData.status === "pending task" &&
            "text-yellow-800 bg-yellow-200"
          } p-1.5 rounded-md text-[0.75rem] tracking-wider uppercase font-bold bg-opacity-50 font-sans`}
        >
          {singleRowData.status}
        </span>
        <p>{singleRowData.area}</p>
      </div>
    </div>
  );
};

export default VehiclesDataTable;
