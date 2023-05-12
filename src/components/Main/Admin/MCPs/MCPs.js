import React from "react";
import MCPsCard from "./MCPsCard";
import { useSelector } from "react-redux";

const MCPs = () => {
  const allMCPs = useSelector((state) => state.mcps.allMCPs);

  const emptyMCPs = allMCPs.filter((MCP) => {
    return MCP.status === "empty";
  });
  const fullMCPs = allMCPs.filter((MCP) => {
    return MCP.status === "full";
  });
  const progressMCPs = allMCPs.filter((MCP) => {
    return MCP.status === "progress";
  });

  return (
    <div className="mt-[6rem] w-[90%] md:w-[85%] mx-auto">
      <h1 className="font-semibold text-[2rem] text-center mb-4">
        Major Collecting Points
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-50 rounded-md shadow">
        <div className="m-2">
          <h1 className="p-2 tracking-wider mb-2 font-bold text-lg border-t-2 border-blue-500 text-blue-500">
            Empty{" "}
            <span className="text-gray-400">{`(${emptyMCPs.length})`}</span>
          </h1>
          {emptyMCPs.map((MCP, index) => {
            return <MCPsCard key={index} data={MCP} />;
          })}
        </div>
        <div className="m-2">
          <h1 className="p-2 tracking-wider mb-2 font-bold text-lg border-t-2 border-yellow-500 text-yellow-500">
            Full <span className="text-gray-400">{`(${fullMCPs.length})`}</span>
          </h1>
          {fullMCPs.map((MCP, index) => {
            return <MCPsCard key={index} data={MCP} />;
          })}
        </div>
        <div className="m-2">
          <h1 className="p-2 tracking-wider mb-2 font-bold text-lg border-t-2 border-green-500 text-green-500">
            In Progress{" "}
            <span className="text-gray-400">{`(${progressMCPs.length})`}</span>
          </h1>
          {progressMCPs.map((MCP, index) => {
            return <MCPsCard key={index} data={MCP} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MCPs;
