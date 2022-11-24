import React, { useState } from "react";
import { todoList } from "../../constants/constants";
import "./Footer.scss";

function Footer({ clearCompleted, setFilter, list }) {
  const { filters, todo, filter } = todoList;
  const [active, setActive] = useState("All");

  const handleChangeFilter = (filter) => {
    setActive(filter);
    setFilter(filter);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{list.length}</strong> item left
      </span>
      <ul className="filters">
        {Object.keys(filters).map((filter) => (
          <li key={filter}>
            <a
              href={`#${filter}`}
              className={`${active === filter ? "selected" : ""}`}
              onClick={() => handleChangeFilter(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
