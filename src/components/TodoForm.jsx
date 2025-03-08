import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const addTodoHanlder = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };
  return (
    <div className="w-1/2">
      <form onSubmit={addTodoHanlder}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          name="todo"
          id="todo"
          placeholder="Add Todo"
          className="h-8 border-none w-[90%] bg-white rounded-l-lg pl-1"
        />
        <button
          type="submit"
          className="bg-green-700 text-white rounded-r-lg
        w-[10%] h-8 pl-1 pr-1 cursor-pointer
        "
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
