import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function Task({
  id,
  task,
  onCheckboxChange,
  deleteTaskHandler,
}) {
  const [isEditable, setIsEditabel] = useState(false);

  const paragraphRef = useRef(null);

  const editHandler = () => {
    setIsEditabel(true);
  };
  const checkBoxHandler = () => {
    onCheckboxChange(id);
  };
  const deleteHandler = () => {
    deleteTaskHandler(id);
  };
  useEffect(() => {
    paragraphRef.current.focus();
  }, [isEditable]);

  return (
    <div className="flex gap-4 mt-4">
      <input
        type="checkbox"
        className="w-8"
        checked={task.isCompleted}
        onChange={checkBoxHandler}
      />

      <p
        ref={paragraphRef}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        autoFocus
        onBlur={() => setIsEditabel(false)}
        className={`w-full p-4 text-lg bg-gray-300 focus:outline-blue-500 ${
          task.isCompleted ? "line-through" : ""
        }`}
      >
        {task.todoText}
      </p>

      <div className="flex gap-4 justify-center items-center p-4 bg-purple-700 text-white">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="hover:text-red-500"
          onClick={editHandler}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="hover:text-red-500"
          onClick={deleteHandler}
        />
      </div>
    </div>
  );
}
