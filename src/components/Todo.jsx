import React, { useEffect, useState, useContext } from "react";
import Task from "./Task";
import i18n from "./i18n.json";
import { v4 as uuidv4 } from "uuid";
import { TaskListContext } from "../contexts/ContextProvider";
const LangEnum = Object.keys(i18n);

const SortOptions = {
  NEWEST_FIRST: "NEWEST_FIRST",
  OLDEST_FIRST: "OLDEST_FIRST",
  ALPHABETICAL: "ALPHABETICAL",
  ALPHABETICAL_REVERSE: "ALPHABETICAL_REVERSE",
};

export default function Todo() {
  // localStorage.clear();
  const { tasksList, setTasksList } = useContext(TaskListContext);

  const [userSelectedLanguage, setUserSelectedLanguage] = useState("EN");
  const [userSelectedSortOption, setUserSelectedSortOption] = useState(
    SortOptions.NEWEST_FIRST
  );

  const [userInputValue, setUserInputValue] = useState("");

  useEffect(() => {
    setTasksList(() => {
      try {
        const localData = localStorage.getItem("tasks");
        return localData ? JSON.parse(localData) : [];
      } catch (e) {
        console.log(e);
        return [];
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  const addTaskHandler = () => {
    const newItem = {
      todoText: userInputValue,
      isCompleted: false,
      createdAt: new Date(),
      id: uuidv4(),
    };

    setTasksList((prev) => [...prev, newItem]);
    setUserInputValue("");
  };

  const updateTaskHandler = (value, _id) => {
    //* update task by set function
    setTasksList((prevTask) => {
      const updateTask = [...prevTask];
      return updateTask.map((task) => {
        if (task.id === _id) return { ...task, todoText: value };
        return task;
      });
    });

    //* update task by getting all previous values

    // const prevTaskList = [...tasksList];
    // const updatedTask = prevTaskList.map((task) => {
    //   if (task.id === _id) return { ...task, todoText: value };
    //   return task;
    // });
    // setTasksList(updatedTask);
  };

  const checkboxChangeHandler = (_id) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === _id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      })
    );
  };
  const deleteTaskHandler = (_id) => {
    const filteredTasksList = tasksList.filter((task) => task.id !== _id);
    setTasksList(filteredTasksList);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full sm:w-4/5 h-full md:h-4/5 p-4 bg-gray-300 overflow-auto">
        <h1 className="font-bold font-serif text-3xl text-black">Todo App</h1>

        <div>
          <select
            value={userSelectedLanguage}
            onChange={(e) => setUserSelectedLanguage(e.target.value)}
          >
            {LangEnum.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={userSelectedSortOption}
            onChange={(e) => setUserSelectedSortOption(e.target.value)}
          >
            {Object.keys(SortOptions).map((key) => (
              <option key={key} value={SortOptions[key]}>
                {i18n[userSelectedLanguage][key]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-8">
          <input
            type="text"
            placeholder="Add your new todo"
            className="w-full p-4 text-xl font-medium"
            value={userInputValue}
            onChange={(e) => setUserInputValue(e.target.value)}
          />
          <button
            className={`py-4 px-6  bg-purple-800 text-white  font-semibold text-4xl hover:bg-purple-500 hover:text-black `}
            onClick={() => addTaskHandler()}
          >
            +
          </button>
        </div>
        <div className="bg-gray-100 mt-4 p-2 ">
          {tasksList
            ?.sort((a, b) => {
              switch (userSelectedSortOption) {
                case SortOptions.NEWEST_FIRST:
                  return new Date(b.createdAt) - new Date(a.createdAt);
                case SortOptions.OLDEST_FIRST:
                  return new Date(a.createdAt) - new Date(b.createdAt);
                case SortOptions.ALPHABETICAL:
                  if (a.todoTask < b.todoTask) {
                    return 1;
                  }
                  if (a.todoTask > b.todoTask) {
                    return -1;
                  }

                  return 0;
                case SortOptions.ALPHABETICAL_REVERSE:
                  if (b.todoTask < a.todoTask) {
                    return -1;
                  }
                  if (b.todoTask > a.todoTask) {
                    return 1;
                  }
                  return 0;
              }
            })
            .map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  onCheckboxChange={checkboxChangeHandler}
                  deleteTaskHandler={deleteTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
