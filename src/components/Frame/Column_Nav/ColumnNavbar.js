import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ColumnNavbarItem from "./ColumnNavbarItem";

const ColumnNavbar = (props) => {
  const { navItems } = props;
  const changeActiveStateHandler = (index) => {
    let newNavItems = navItems;
    for (let i = 0; i < newNavItems.length; i++) {
      if (i === index) {
        newNavItems[i].isActive = true;
      } else newNavItems[i].isActive = false;
    }
    props.onUpdateDataStatus([...newNavItems]);
  };

  return (
    <div className="w-24 lg:w-64 bg-[#263544] fixed top-0 bottom-0">
      <h1 className="h-[4rem] lg:flex items-center shadow-md text-white font-black text-[1.5rem] px-8 whitespace-nowrap hidden">{`${props.role} PAGE`}</h1>
      <div className="h-[4rem] flex items-center justify-center shadow-md text-white font-black text-[1.5rem] px-8 whitespace-nowrap lg:hidden">
        <FontAwesomeIcon className="" icon={faBars} />
      </div>
      <ul className="flex flex-col min-w-full">
        {navItems.map((item, index) => {
          return (
            <ColumnNavbarItem
              onChangeActiveState={changeActiveStateHandler.bind(null, index)}
              key={index}
              itemName={item.name}
              itemIcon={item.icon}
              itemActiveStatus={item.isActive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ColumnNavbar;
