import { useState, createContext } from "react";

export const TaskListContext = createContext();

export function ContextProvider(props) {
  const [tasksList, setTasksList] = useState();

  return (
    <TaskListContext.Provider
      value={{
        tasksList,
        setTasksList,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
}
