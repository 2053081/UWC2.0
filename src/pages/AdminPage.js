import React, { Fragment, useState } from "react";
import ColumnNavbar from "../components/Frame/Column_Nav/ColumnNavbar";
import Header from "../components/Frame/Header/Header";
import Table from "../components/Main/Admin/Table/Table";
import OptimizedRoutes from "../components/Map/OptimizedRoutes";
import MCPs from "../components/Main/Admin/MCPs/MCPs";
import { adminNavItems, usersInfoDir, vehiclesInfoDir } from "../DummyData";
import Tasks from "../components/Main/Admin/Tasks/Tasks";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const [navItems, setNavItems] = useState([...adminNavItems]);

  const updateNavItemsStatusHandler = (newNavItems) => {
    setNavItems(newNavItems);
  };

  const usersData = useSelector((state) => state.users.allUsers);

  const vehiclesData = useSelector((state) => state.vehicles.allVehicles);

  return (
    <Fragment>
      <ColumnNavbar
        role="ADMIN"
        navItems={navItems}
        onUpdateDataStatus={updateNavItemsStatusHandler}
      />
      <div className="ml-24 lg:ml-64">
        {navItems.map((navItem, index) => {
          return (
            navItem.isActive && (
              <Header role="Admin" key={index} currentData={navItem.name} />
            )
          );
        })}
        {navItems.map((navItem, index) => {
          let content = undefined;

          if (navItem.isActive === true) {
            if (navItem.name === "Users") {
              content = (
                <Table
                  category="users"
                  key={index}
                  infoDir={usersInfoDir}
                  data={usersData}
                />
              );
            } else if (navItem.name === "Optimized Routes") {
              content = <OptimizedRoutes key={index} />;
            } else if (navItem.name === "Vehicles") {
              content = (
                <Table
                  category="vehicles"
                  key={index}
                  infoDir={vehiclesInfoDir}
                  data={vehiclesData}
                />
              );
            } else if (navItem.name === "MCPs") {
              content = <MCPs key={index} />;
            } else if (navItem.name === "Tasks Assignment") {
              content = <Tasks key={index} />;
            }
          }
          return content;
        })}
      </div>
    </Fragment>
  );
};

export default AdminPage;
