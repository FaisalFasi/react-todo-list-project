/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function Task({
  id,
  task,
  onCheckboxChange,
  deleteTaskHandler,
  updateTaskHandler,
}) {
  const [isEditable, setIsEditabel] = useState(true);
  const [taskUpdating, setTaskUpdating] = useState(task.todoText.trim());
  const paragraphRef = useRef(null);

  const editHandler = () => {
    setIsEditabel(false);
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

  useEffect(() => {
    const textareaElement = paragraphRef.current;

    textareaElement.style.height = `${textareaElement.scrollHeight}px`;
    // Set the height to fit the content
  }, [taskUpdating]);

  return (
    <div className="flex gap-4 my-4  ">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="hidden" // Hide the default checkbox
          checked={task.isCompleted}
          onChange={checkBoxHandler}
        />
        <div
          className={`w-5 h-5 border rounded ${
            task.isCompleted
              ? "bg-green-500 border-green-500"
              : "bg-red-600 border-gray-400"
          }`}
        ></div>
      </label>

      <textarea
        ref={paragraphRef}
        value={taskUpdating}
        readOnly={isEditable}
        autoFocus
        onChange={(e) => {
          setTaskUpdating(e.target.value);
        }}
        onBlur={() => {
          setIsEditabel(true);
          updateTaskHandler(taskUpdating, id);
        }}
        className={`w-full resize-none rounded  px-4 py-4 bg-[#b9dcf2] focus:outline-blue-500 shadow-sm shadow-green-500 text-blue-700 text-xl  ${
          task.isCompleted ? "line-through" : ""
        }`}
        style={{
          height: "40px",
        }}
      />

      <div className="flex gap-4 justify-center items-center p-4 bg-[#b9dcf2] text-blue-700 rounded">
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
