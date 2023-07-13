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
  console.log();
  const [isEditable, setIsEditabel] = useState(true);
  const [taskUpdating, setTaskUpdating] = useState(task.todoText);
  const paragraphRef = useRef(null);
  // const [textareaValue, setTextareaValue] = useState();

  const handleGetValue = () => {
    console.log(paragraphRef.current.value);
    // Do something with the textarea value
  };

  const editHandler = () => {
    setIsEditabel(false);
    // updateTaskHandler(id);
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
    // textareaElement.style.height = "auto"; // Reset the height to auto
    textareaElement.style.height = `${textareaElement.scrollHeight}px`; // Set the height to fit the content
  }, [taskUpdating]);

  return (
    <div className="flex  gap-4 mt-4">
      <input
        type="checkbox"
        className="w8"
        checked={task.isCompleted}
        onChange={checkBoxHandler}
      />
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
        className={`w-full resize-none  pl-4 py-auto text-lg bg-gray-300 focus:outline-blue-500 ${
          task.isCompleted ? "line-through" : ""
        }`}
        // style={{ padding: "25px 0" }}
      />

      {/* <testarea
        ref={paragraphRef}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        autoFocus
        onChange={(e) => setTaskUpdating(e.target.value)}
        // onBlur={handleBlur}
        // onChange={(e) => setUpdateValue(e.target.value)}
        onBlur={() => setIsEditabel(false)}
        className={`w-full p-4 text-lg bg-gray-300 focus:outline-blue-500 ${
          task.isCompleted ? "line-through" : ""
        }`}
      >
        {task.todoText}
      </testarea> */}

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
