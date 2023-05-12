import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const BreadCrumb = (props) => {
  return (
    <div className="bg-white h-10 flex items-center font-semibold text-gray-800 whitespace-nowrap">
      <FontAwesomeIcon icon={faHouse} />
      <span className="px-2">/</span>
      <span>{props.role}</span>
      <span className="px-2">/</span>
      <span>{props.currentData}</span>
    </div>
  );
};

export default BreadCrumb;
