import React, { Fragment, useState } from "react";
import Modal from "../../../UI/Modal";
import TaskItem from "./TaskItem";
import CreateTasksForm from "./CreateTasksForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../../../Store/usersData";
import { MCPssAction } from "../../../../Store/mcpsData";
import { vehiclesAction } from "../../../../Store/vehicleData";
import { tasksAction } from "../../../../Store/tasksList";

const Tasks = () => {
  const [createTask, setCreateTask] = useState(false);
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.allTasks);

  const closeModalHandler = () => {
    setCreateTask(false);
  };

  const openModalHandler = () => {
    setCreateTask(true);
  };

  const createTaskHandler = (taskInfo) => {
    dispatch(tasksAction.addTasks(taskInfo));

    //send post request to sever
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskInfo),
    };

    fetch("http://127.0.0.1:8080/api/v1/tasks", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const deleteTaskHandler = (deleteTask) => {
    dispatch(tasksAction.deleteTask(deleteTask.id));

    dispatch(
      usersAction.updateUserStatus({
        id: deleteTask.employeeId,
        status: "Available",
      })
    );

    if (deleteTask.type === "janitor") {
      if (deleteTask.status === "pending") {
        dispatch(
          MCPssAction.updateMCPsStatus({
            id: deleteTask.mcpId,
            status: "empty",
          })
        );
      } else if (deleteTask.status === "finished") {
        dispatch(
          MCPssAction.updateMCPsStatus({ id: deleteTask.mcpId, status: "full" })
        );
      }
    } else if (deleteTask.type === "collector") {
      if (deleteTask.status === "pending") {
        dispatch(
          MCPssAction.updateMCPsStatus({
            id: deleteTask.mcpId,
            status: "full",
          })
        );
      } else if (deleteTask.status === "finished") {
        dispatch(
          MCPssAction.updateMCPsStatus({
            id: deleteTask.mcpId,
            status: "empty",
          })
        );
      }

      dispatch(
        vehiclesAction.updateVehiclesStatus({
          id: deleteTask.vehicleId,
          status: "available",
        })
      );
    }

    //send deleteTask request to sever
    fetch("http://127.0.0.1:8080/api/v1/tasks/delete/" + deleteTask.id, {
      method: "DELETE",
    }).then((response) => {
      console.log("success");
    });
  };

  return (
    <Fragment>
      <div className="mt-[6rem]">
        <h1 className="text-center text-[2rem] font-semibold">
          Task Assignment
        </h1>
        <p className="text-[0.8rem] text-slate-500 text-center">
          Are there any MCPs need to be handled?{" "}
          <span
            className="text-black font-bold hover:underline cursor-pointer"
            onClick={openModalHandler}
          >
            New Task
          </span>
        </p>
      </div>
      {createTask && (
        <Modal onCloseModal={closeModalHandler}>
          <CreateTasksForm
            onCloseModal={closeModalHandler}
            onCreateTask={createTaskHandler}
          />
        </Modal>
      )}
      {allTasks.length > 0 &&
        allTasks.map((task, index) => {
          return (
            <TaskItem
              key={index}
              task={task}
              onDeleteTask={deleteTaskHandler.bind(null, task)}
            />
          );
        })}
      {allTasks.length === 0 && (
        <div className="text-center mt-16">
          <FontAwesomeIcon
            className="text-slate-400 text-[15rem]"
            icon={faClipboardCheck}
          />
          <p className="font-bold text-[1.5rem] mt-3">NO TASK FOUND</p>
          <p className="text-gray-500">There are no tasks to display...</p>
        </div>
      )}
    </Fragment>
  );
};

export default Tasks;
