import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoList = ({ todo }) => {
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [isEditable, setIsEditable] = useState(false);
  const { completeTodo, deleteTodo, updateTodo } = useTodo();
  const completeTodoHandler = () => {
    completeTodo(todo.id);
  };
  const updateTodoHandler = () => {
    if (!todoMsg) return;
    updateTodo(todo.id, todoMsg);
    setIsEditable(false);
  };
  const deleteTodoHanlder = () => {
    deleteTodo(todo.id);
  };
  console.log("isEditable", isEditable);
  return (
    <div
      className={`w-1/2  rounded-lg p-2 ${
        todo.completed ? "bg-gray-300  " : "bg-violet-200 text-black"
      }`}
    >
      <input
        type="checkbox"
        onClick={completeTodoHandler}
        name="todoCompleted"
        id="todoCompleted"
        className="ml-2 mr-2"
      />
      <input
        type="text"
        name="todoMsg"
        id="todoMsg"
        onChange={(e) => setTodoMsg(e.target.value)}
        value={todoMsg}
        readOnly={!isEditable}
        className={`h-8 border-none w-[80%]  pl-1 ${
          todo.completed && "line-through"
        } `}
      />
      <button
        onClick={() => {
          if (todo.completed) return;
          if (isEditable) {
            updateTodoHandler();
          } else {
            setIsEditable((prev) => !prev);
          }
        }}
        className="ml-2 mr-2"
        disabled={todo.completed}
      >
        {isEditable ? "📄" : "✏️"}
      </button>
      <button onClick={deleteTodoHanlder} className="ml-2 mr-2">
        ❌
      </button>
    </div>
  );
};

export default TodoList;
