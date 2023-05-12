import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ColumnNavbar from "../components/Frame/Column_Nav/ColumnNavbar";
import { employeeNavItems } from "../DummyData";
import Header from "../components/Frame/Header/Header";
import TaskInfo from "../components/Main/Employee/Tasks/TaskInfo";
import NoTaskFound from "../components/Main/Employee/Tasks/NoTaskFound";
import OptimizedRoutes from "../components/Map/OptimizedRoutes";

const EmployeePage = () => {
  const [navItems, setNavItems] = useState([...employeeNavItems]);

  const updateNavItemsStatusHandler = (newNavItems) => {
    setNavItems(newNavItems);
  };

  const userID = useSelector((state) => state.currentUser.id);
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const userTask = allTasks.find((task) => task.employeeId === userID);

  return (
    <Fragment>
      <ColumnNavbar
        role="EMPLOYEE"
        navItems={navItems}
        onUpdateDataStatus={updateNavItemsStatusHandler}
      />
      <div className="ml-24 lg:ml-64">
        {navItems.map((navItem, index) => {
          return (
            navItem.isActive && (
              <Header role="Employee" key={index} currentData={navItem.name} />
            )
          );
        })}
        {navItems.map((navItem, index) => {
          let content = undefined;

          if (navItem.isActive === true) {
            if (navItem.name === "My tasks") {
              if (userTask) {
                content = <TaskInfo key={index} userTask={userTask} />;
              } else {
                content = <NoTaskFound key={index} />;
              }
            } else if (navItem.name === "Optimized Routes") {
              content = <OptimizedRoutes key={index} />;
            }
          }
          return content;
        })}
      </div>
    </Fragment>
  );
};

export default EmployeePage;
