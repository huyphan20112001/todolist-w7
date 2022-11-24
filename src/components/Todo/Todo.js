import React from "react";
import TodoContent from "../TodoContent/TodoContent";
import "./Todo.scss";

function Todo({
  handleCheckAll,
  checkAll,
  list,
  filters,
  currentFilter,
  handleToggleCheck,
  handleShowConfirm,
  handleEditing,
  editing,
  handleBlur,
  handleUpdate,
}) {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={() => handleCheckAll()}
        checked={checkAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {list.filter(filters[currentFilter]).map((item) => {
          return (
            <TodoContent
              data={item}
              handleToggleCheck={handleToggleCheck}
              handleShowConfirm={handleShowConfirm}
              handleEditing={handleEditing}
              editing={editing}
              handleBlur={handleBlur}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Todo;
