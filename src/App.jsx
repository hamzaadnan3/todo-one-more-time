import { useEffect, useState } from "react";
import { TodoContextProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const todoTemp = JSON.parse(localStorage.getItem("todos"));
    if (todoTemp && todoTemp.length > 0) {
      setTodo(todoTemp);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (todo) => {
    setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, todo } : prevTodo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };
  const completeTodo = (id) => {
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  return (
    <TodoContextProvider
      value={{
        addTodo,
        completeTodo,
        deleteTodo,
        todo,
        updateTodo,
      }}
    >
      <div
        className="w-full h-screen flex flex-col items-center bg-blue-950
      pt-10 gap-5
      "
      >
        <TodoForm />
        {todo?.map((todoItem) => (
          <TodoList key={todoItem.id} todo={todoItem} />
        ))}
      </div>
    </TodoContextProvider>
  );
}

export default App;
