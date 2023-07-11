import React, { useEffect, useState } from "react";
import Task from "./Task";
import i18n from "./i18n.json";
// const SortOptions = {
//   English: "NEWEST_FIRST",
//   Urdu: "OLDEST_FIRST",
//   Deutsch: "ALPHABETICAL",
//   French: "ALPHABETICAL_REVERSE",
// };
const LangEnum = Object.keys(i18n);
console.log(LangEnum);
const SortOptions = {
  NEWEST_FIRST: "NEWEST_FIRST",
  OLDEST_FIRST: "OLDEST_FIRST",
  ALPHABETICAL: "ALPHABETICAL",
  ALPHABETICAL_REVERSE: "ALPHABETICAL_REVERSE",
};

export default function Todo() {
  const [userSelectedSortOption, setUserSelectedSortOption] = useState(
    SortOptions.NEWEST_FIRST
  );

  const [userSelectedLanguage, setUserSelectedLanguage] = useState("EN");

  const [inputValue, setInputValue] = useState({
    todoTask: "",
    isCompleted: false,
  });
  const [newTaskArray, setNewTaskArray] = useState(
    JSON.parse(localStorage.getItem("tasks"))
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(newTaskArray));
  }, [newTaskArray]);

  const addTaskHandler = () => {
    setNewTaskArray([
      ...newTaskArray,
      { ...inputValue, createdAt: new Date() },
    ]);
    setInputValue({
      todoTask: "",
      isCompleted: false,
    });
  };

  const handleCheckboxChange = (index) => {
    setNewTaskArray((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      })
    );
  };
  const deleteTaskHandler = (index) => {
    const filteredArray = newTaskArray.filter((_, idx) => idx !== index);
    setNewTaskArray(filteredArray);
  };
  useEffect(() => {
    console.log(newTaskArray);
  }, [newTaskArray]);

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
            value={inputValue.todoTask}
            onChange={(e) =>
              setInputValue({ todoTask: e.target.value, isCompleted: false })
            }
          />

          <button
            className="py-4 px-6  bg-purple-800 text-white  font-semibold text-4xl hover:bg-purple-500 hover:text-black"
            onClick={() => addTaskHandler()}
          >
            +
          </button>
        </div>

        <div>
          {newTaskArray
            .sort((a, b) => {
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
            .map((task, index) => {
              return (
                <Task
                  key={index}
                  id={index}
                  task={task}
                  onCheckboxChange={handleCheckboxChange}
                  deleteTaskHandler={deleteTaskHandler}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
