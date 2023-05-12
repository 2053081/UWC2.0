import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

const NoTaskFound = () => {
  return (
    <Fragment>
      <h1 className="font-bold text-[2rem] mt-[6rem] text-center">
        NO TASK FOUND
      </h1>
      <div className="text-center mt-4">
        <FontAwesomeIcon
          className="text-slate-400 text-[15rem]"
          icon={faClipboardCheck}
        />
        <p className="text-gray-500 mt-6 text-[1.25rem]">
          There are no tasks for you at the moment
        </p>
      </div>
    </Fragment>
  );
};

export default NoTaskFound;
