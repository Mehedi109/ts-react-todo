import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useCallback, useReducer, useRef } from "react";
import "./Todo.css";

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

const ToDo = () => {
  interface Todo {
    id: number;
    text: string;
  }

  const data: any = localStorage.getItem("lists");
  const todoList = JSON.parse(data) || [];

  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        localStorage.setItem(
          "lists",
          JSON.stringify([...state, { id: state.length, text: action.text }])
        );
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        localStorage.setItem(
          "lists",
          JSON.stringify(state.filter(({ id }) => id !== action.id))
        );
        return state.filter(({ id }) => id !== action.id);
    }
  }

  const [todos, dispatch] = useReducer(reducer, todoList);

  const addRef = useRef<HTMLInputElement>(null);

  const addToDo = useCallback((e) => {
    e.preventDefault();
    if (addRef.current && !addRef.current.contains(e.target)) {
      dispatch({
        type: "ADD",
        text: addRef.current.value,
      });
      addRef.current.value = "";
    }
  }, []);

  return (
    <div style={{ backgroundColor: "" }} className="todo-app">
      <h1>List of independent country</h1>
      <form onSubmit={addToDo} className="todo-form">
        <input
          type="text"
          required
          ref={addRef}
          className="todo-input"
          name="todo"
          placeholder="Enter The Country Name"
        />
        <button className="todo-btn">Add Country</button>
      </form>
      {todos.map((todo) => (
        <div className="todo-list">
          <div>
            <h3>{todo.text}</h3>
          </div>
          <div>
            <IconButton
              onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
              aria-label="delete"
              size="medium"
              className="dlt-btn"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDo;
