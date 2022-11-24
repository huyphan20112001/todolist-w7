import React, { useEffect, useRef, useState } from "react";
import "./TodoContent.scss";

function TodoContent({
  data,
  handleToggleCheck,
  handleShowConfirm,
  handleEditing,
  editing,
  handleBlur,
  handleUpdate,
  handleSetInputValue,
}) {
  const inputEditRef = useRef();
  const [value, setValue] = useState(data.name);

  useEffect(() => {
    inputEditRef && inputEditRef.current.focus();
  }, [handleEditing]);

  const handleSetInputEdit = (e) => {
    setValue(e);
  };

  // console.log("data", data);

  return (
    <li
      key={data.id}
      className={`${data.completed ? "completed" : ""} ${
        editing === data.id ? "editing" : ""
      }`}
      onDoubleClick={() => handleEditing(data.id)}
      onBlur={() => handleBlur()}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={data.completed}
          onClick={() => handleToggleCheck(data.id)}
        />
        <label>{data.name}</label>
        <button
          className="destroy"
          onClick={() => handleShowConfirm(data.id)}
        ></button>
      </div>
      <input
        className="edit"
        ref={inputEditRef}
        value={value}
        onChange={(e) => handleSetInputEdit(e.target.value)}
        placeholder={value}
        onKeyUp={(e) => handleUpdate(e, data.id)}
      />
    </li>
  );
}

export default TodoContent;
