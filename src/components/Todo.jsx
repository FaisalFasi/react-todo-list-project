import { useEffect, useState, useContext } from "react";
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
    <div className="h-screen flex justify-center items-center p-8 ">
      <div className="w-full sm:w-4/5 h-full md:h-4/5 p-4 bg-[#b9dcf2]  rounded  shadow-lg shadow-green-900 ">
        <h1 className="font-bold font-serif text-3xl text-blue-700">
          Todo App
        </h1>

        <div>
          <select
            value={userSelectedLanguage}
            onChange={(e) => setUserSelectedLanguage(e.target.value)}
            className=" mt-4 rounded bg-blue-700 px-4 py-1 text-white font-bold"
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
            className=" mt-2 rounded bg-blue-700 px-4 py-1 text-white font-bold"
          >
            {Object.keys(SortOptions).map((key) => (
              <option key={key} value={SortOptions[key]}>
                {i18n[userSelectedLanguage][key]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-8 ">
          <input
            type="text"
            placeholder="Add your new todo"
            className="w-full px-4 py-2 text-xl font-medium rounded shadow-md shadow-blue-400"
            value={userInputValue}
            onChange={(e) => setUserInputValue(e.target.value)}
          />
          <button
            className={`py-2 px-4  bg-blue-700 text-white  font-semibold text-4xl hover:bg-blue-500 hover:text-black `}
            onClick={() => addTaskHandler()}
          >
            +
          </button>
        </div>
        <div className="overflow-auto bg-blue-700 mt-4 p-2 rounded">
          <div className=" ">
            {tasksList
              ?.sort((a, b) => {
                switch (userSelectedSortOption) {
                  case SortOptions.NEWEST_FIRST:
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  case SortOptions.OLDEST_FIRST:
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  case SortOptions.ALPHABETICAL:
                    if (a.todoText < b.todoText) {
                      return -1;
                    }
                    if (a.todoText > b.todoText) {
                      return 1;
                    }

                    return 0;
                  case SortOptions.ALPHABETICAL_REVERSE:
                    if (b.todoText < a.todoText) {
                      return -1;
                    }
                    if (b.todoText > a.todoText) {
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
    </div>
  );
}
