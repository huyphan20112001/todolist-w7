import React, { useEffect, useState } from "react";
import { todoList } from "../../constants/constants";
import Footer from "../Footer/Footer";
import TodoContent from "../TodoContent/TodoContent";
import "./Header.scss";

function Header({
  inputValue,
  handleAdd,
  handleCheckAll,
  checkAll,
  list,
  filters,
  currentFilter,
  handleSetInputValue,
}) {
  // console.log(list.every(filters.Completed));

  return (
    <>
      <header className="header">
        <h1>Todo List</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputValue}
          onChange={(e) => handleSetInputValue(e.target.value)}
          onKeyUp={handleAdd}
        />
      </header>
    </>
  );
}

export default Header;
