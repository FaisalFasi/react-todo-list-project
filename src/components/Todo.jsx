import React, { useEffect, useState } from "react";
import Task from "./Task";
import i18n from "./i18n.json";
import { v4 as uuidv4 } from "uuid";

// const SortOptions = {
//   English: "NEWEST_FIRST",
//   Urdu: "OLDEST_FIRST",
//   Deutsch: "ALPHABETICAL",
//   French: "ALPHABETICAL_REVERSE",
// };
const LangEnum = Object.keys(i18n);

const SortOptions = {
  NEWEST_FIRST: "NEWEST_FIRST",
  OLDEST_FIRST: "OLDEST_FIRST",
  ALPHABETICAL: "ALPHABETICAL",
  ALPHABETICAL_REVERSE: "ALPHABETICAL_REVERSE",
};

export default function Todo() {
  // localStorage.clear();
  const [userSelectedLanguage, setUserSelectedLanguage] = useState("EN");
  const [userSelectedSortOption, setUserSelectedSortOption] = useState(
    SortOptions.NEWEST_FIRST
  );

  const [tasksList, setTasksList] = useState(() => {
    const localData = localStorage.getItem("tasks");
    return localData ? JSON.parse(localData) : [];
  });

  const [userInputValue, setUserInputValue] = useState("");

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
  // useEffect(() => {
  //   console.log(tasksList);
  // }, [tasksList]);

  return (
    <div>
      <div className=" w-1/2  m-auto mt-16 p-4 bg-gray-200 ">
        <h1 className=" font-bold font-serif text-3xl text-black  ">
          Todo App
        </h1>

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
                {/* {SortOptions.NEWEST_FIRST} */}
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
            className="py-4 px-6  bg-purple-800 text-white  font-semibold text-4xl hover:bg-purple-500 hover:text-black"
            onClick={() => addTaskHandler()}
          >
            +
          </button>
        </div>
        <div>
          {tasksList
            ?.sort((a, b) => {
              switch (userSelectedSortOption) {
                case SortOptions.NEWEST_FIRST:
                  return new Date(b.createdAt) - new Date(a.createdAt);
                case SortOptions.OLDEST_FIRST:
                  return new Date(a.createdAt) - new Date(b.createdAt);
                case SortOptions.ALPHABETICAL:
                  if (a.todoTask < b.todoTask) {
                    return -1;
                  }
                  if (a.todoTask > b.todoTask) {
                    return 1;
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
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
