import React from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(63,68,251,1) 0%, rgba(70,252,86,1) 100%",
      }}
    >
      <Todo />
    </div>
  );
}

export default App;
