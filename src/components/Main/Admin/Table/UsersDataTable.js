import React, { Fragment } from "react";

const UsersDataTable = (props) => {
  const { singleRowData } = props;

  return (
    <Fragment>
      <td className="p-3 whitespace-nowrap font-bold text-blue-400">
        {`#${singleRowData.id}`}
      </td>
      <td className="p-3 whitespace-nowrap">{singleRowData.name}</td>
      <td className="p-3 whitespace-nowrap">{singleRowData.email}</td>
      <td className="p-3 whitespace-nowrap">{singleRowData.phone}</td>
      <td className="p-3 whitespace-nowrap font-sans text-[0.75rem] tracking-wider font-bold">{`${singleRowData.role.toUpperCase()}`}</td>
      <td className="p-3 whitespace-nowrap">
        <span
          className={`${
            singleRowData.status === "Available" &&
            "text-green-800 bg-green-200"
          } ${
            singleRowData.status === "Unavailable" && "text-red-800 bg-red-200"
          } ${
            singleRowData.status === "Pending task" &&
            "text-yellow-800 bg-yellow-200"
          } p-1.5 font-bold text-center rounded-lg bg-opacity-50 font-sans text-[0.75rem] tracking-wider`}
        >
          {singleRowData.status.toUpperCase()}
        </span>
      </td>
    </Fragment>
  );
};

export const UsersDataCard = (props) => {
  const { singleRowData } = props;

  return (
    <div key={singleRowData.id} className="bg-white shadow p-4 rounded-md my-3">
      <div className="flex justify-between flex-wrap">
        <p>{singleRowData.name}</p>
        <p className="font-bold text-blue-400">{`#${singleRowData.id}`}</p>
      </div>
      <div className="flex justify-between py-2 flex-wrap">
        <p>{singleRowData.email}</p>
        <p>{singleRowData.phone}</p>
      </div>
      <div className="flex justify-between">
        <span
          className={`${
            singleRowData.status === "Available" &&
            "text-green-800 bg-green-200"
          } ${
            singleRowData.status === "Unavailable" && "text-red-800 bg-red-200"
          } ${
            singleRowData.status === "Pending task" &&
            "text-yellow-800 bg-yellow-200"
          } p-1.5 rounded-md text-[0.75rem] tracking-wider uppercase font-bold bg-opacity-50 font-sans`}
        >
          {singleRowData.status}
        </span>
        <p className="font-bold font-sans tracking-wider">
          {singleRowData.role}
        </p>
      </div>
    </div>
  );
};

export default UsersDataTable;
