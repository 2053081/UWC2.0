import React, { Fragment, useState, useEffect } from "react";
import UsersDataTable, { UsersDataCard } from "./UsersDataTable";
import VehiclesDataTable, { VehiclesDataCard } from "./VehiclesDataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Table = (props) => {
  const { infoDir, data, category } = props;

  const [renderedData, setRenderedData] = useState(data);

  useEffect(() => {
    setRenderedData(data.slice(0, 5));
  }, [data]);

  return (
    <Fragment>
      <h1 className="mt-[6rem] text-center font-bold text-[2rem] md:mb-4 mb-1">
        {category === "vehicles" ? "Specialized Vehicles" : "Users List"}
      </h1>
      <div className="hidden md:block bg-white w-[90%] lg:w-[85%] mx-auto p-4 rounded-lg overflow-auto shadow">
        <table className="table-auto w-full">
          <thead className="text-left bg-gray-50 border-b-2 border-gray-100">
            <tr className="text-[#0A284A]">
              <th className="p-3 whitespace-nowrap">No.</th>
              {infoDir.map((dir, index) => {
                return (
                  <th key={index} className="p-3 whitespace-nowrap">
                    {dir}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {renderedData.map((singleRowData, index) => (
              <tr key={index} className={`${index % 2 !== 0 && "bg-gray-50"}`}>
                <td className="py-3 pr-3 px-4 whitespace-nowrap font-bold">{`${
                  index + 1
                }.`}</td>
                {category === "users" && (
                  <UsersDataTable singleRowData={singleRowData} />
                )}
                {category === "vehicles" && (
                  <VehiclesDataTable singleRowData={singleRowData} />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[90%] mx-auto md:hidden grid grid-cols-1">
        {renderedData.map((singleRowData, index) => {
          return (
            <Fragment key={index}>
              {category === "users" && (
                <UsersDataCard singleRowData={singleRowData} />
              )}
              {category === "vehicles" && (
                <VehiclesDataCard singleRowData={singleRowData} />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="flex justify-end gap-4 overflow-auto md:w-[85%] w-[90%] mx-auto mb-3 md:my-4">
        <button
          className="flex items-center"
          onClick={() => {
            setRenderedData(data.slice(0, 5));
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
          Previous
        </button>
        <button
          className="flex items-center"
          onClick={() => {
            setRenderedData(data.slice(5, 5));
          }}
        >
          Next
          <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
        </button>
      </div>
    </Fragment>
  );
};

export default Table;
