import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentUserAction } from "../../../Store/CurrentUser";

const Header = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="h-[4rem] bg-white shadow-md fixed top-0 right-0 left-[6rem] lg:left-[16rem] z-10">
      <div className="h-full flex items-center w-[90%] lg:w-[85%] mx-auto justify-between">
        <BreadCrumb role={props.role} currentData={props.currentData} />
        <div className="relative whitespace-nowrap pl-4">
          <FontAwesomeIcon
            icon={faMessage}
            className="text-[1.5rem] text-slate-500 "
          />
          <span className="absolute rounded-full w-6 h-6 text-white bg-red-500 right-[68px] top-[-10px] text-center font-bold">
            2
          </span>
          <FontAwesomeIcon
            icon={faBell}
            className="text-[1.5rem] text-slate-500 px-4"
          />
          <span className="absolute rounded-full w-6 h-6 text-white bg-red-500 right-[30px] top-[-10px] text-center font-bold">
            1
          </span>
          <Link to="/login">
            <FontAwesomeIcon
              onClick={() => {
                dispatch(currentUserAction.logout());
              }}
              icon={faRightFromBracket}
              className="text-[1.5rem] text-slate-500 "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
