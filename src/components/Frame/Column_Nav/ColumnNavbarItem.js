import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColumnNavbarItem = (props) => {
  const { itemName, itemIcon, itemActiveStatus } = props;

  let listItemClassName = "hover:text-white py-4 text-slate-400 cursor-pointer";
  if (itemActiveStatus === true) {
    listItemClassName = "py-4 text-white cursor-pointer";
  }

  return (
    <li onClick={props.onChangeActiveState} className={listItemClassName}>
      <div
        className={`w-full px-8  align-center whitespace-nowrap ${
          itemActiveStatus ? "border-l-[3px] border-[#fe8a7d]" : ""
        }`}
      >
        <FontAwesomeIcon
          className="pr-4 h-[1.25rem] w-[2rem]"
          icon={itemIcon}
        />
        <span className="hidden lg:inline-block font-bold text-[1rem]">
          {itemName}
        </span>
      </div>
    </li>
  );
};

export default ColumnNavbarItem;
