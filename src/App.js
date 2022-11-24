import { useEffect, useState } from "react";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import { todoList } from "./constants/constants";

function App() {
  const [inputValue, setInputValue] = useState("");
  const { todo, filter, filters } = todoList;
  const [list, setList] = useState(todo);
  const [editing, setEditing] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(filter);
  const [checkAll, setCheckAll] = useState(list.every(filters.Completed));
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleAdd = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setInputValue("");
      const newId = Math.max(...list.map((item) => item.id), []);
      const newList = {
        id: newId + 1,
        name: inputValue,
        completed: false,
      };
      const newTodo = list;
      newTodo.push(newList);
      setList(newTodo);
      console.log(list);
    }
  };

  const handleToggleCheck = (id) => {
    let newList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : { ...item }
    );
    setList(newList);
  };

  const handleDelete = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
    handelHideConfirm();
  };

  const handleEditing = (id) => {
    setEditing(id);
  };

  const handleBlur = () => {
    setEditing(0);
  };

  const handleUpdate = (e, id) => {
    if (e.key === "Enter" && e.target.value) {
      const newList = list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item;
      });
      setEditing(0);
      e.target.value = "";
      setList(newList);
    }
  };

  const handleClearCompleted = () => {
    const newList = list.filter((item) => item.completed === false);
    setList(newList);
  };

  const handleSetInputValue = (value) => {
    if (!value.startsWith(" ")) {
      setInputValue(value);
    }
  };

  const setFilter = (filter) => {
    setCurrentFilter(filter);
  };
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
  };
  useEffect(() => {
    const newList = list.map((item) => {
      return {
        ...item,
        completed: checkAll,
      };
    });
    // console.log("newlist", newList);
    setList(newList);
  }, [checkAll]);
  // useEffect(() => {
  //   if (list.every(filters.Completed)) {
  //     setCheckAll(!checkAll);
  //   }
  // }, [list]);

  // console.log(list);
  // console.log("list", list);

  const handleShowConfirm = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

  const handelHideConfirm = () => {
    setShowConfirm(false);
    setDeleteId(0);
  };

  return (
    <div className="todo">
      <div className="todoapp">
        <div className={`overlay ${showConfirm ? "show" : ""}`}></div>
        <div className={`confirm-delete ${showConfirm ? "show" : ""}`}>
          <div className="confirm-content">
            <span>Delete?</span>
            <div className="confirm-action">
              <button onClick={() => handleDelete(deleteId)}>Ok</button>
              <button onClick={() => handelHideConfirm()}>Cancel</button>
            </div>
          </div>
        </div>
        <Header
          inputValue={inputValue}
          handleAdd={handleAdd}
          handleCheckAll={handleCheckAll}
          checkAll={checkAll}
          list={list}
          filters={filters}
          currentFilter={currentFilter}
          handleSetInputValue={handleSetInputValue}
        />
        <Todo
          handleCheckAll={handleCheckAll}
          checkAll={checkAll}
          list={list}
          filters={filters}
          currentFilter={currentFilter}
          handleToggleCheck={handleToggleCheck}
          handleShowConfirm={handleShowConfirm}
          handleEditing={handleEditing}
          editing={editing}
          handleBlur={handleBlur}
          handleUpdate={handleUpdate}
        />
        <Footer
          clearCompleted={handleClearCompleted}
          setFilter={setFilter}
          list={list}
        />
      </div>
    </div>
  );
}

export default App;
