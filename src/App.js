import { useEffect, useState } from "react";
import "./styles.css";
import { TodosContainer } from "./components/TodosContainer";
import { CONSTANTS, collections, createTodo } from "./utils/todos";
import { AddTodo } from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([
    createTodo({
      text: "Keep track of all todos",
      collection: collections[1],
      isDeleted: true
    }),
    createTodo({ text: "Finish app", collection: collections[0] })
  ]);
  useEffect(() => {
    function deleteExpiredTodos() {
      // adjust todos that expired
      const end = Date.now();
      const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);
      notCompletedTodos.forEach(function (todo) {
        const elapsed = end - todo.createdTimestamp;
        // if (elapsed > CONSTANTS.TIME_PERIOD.TWO_DAYS) {
        if (elapsed > CONSTANTS.TIME_PERIOD.TWENTY_FOUR_HOURS) {
          todo.isDeleted = true;
        }
      });
      // update State here
      setTodos([...todos]);
      // this is looping mech
    }
    const handle = setTimeout(() => {
      deleteExpiredTodos();
    }, CONSTANTS.TIME_PERIOD.FIVE_SECONDS);
    return () => clearTimeout(handle);
  }, [todos]);

  // deleteExpiredTodos();
  return (
    <>
      <h1 class="header">Procrastination ending soon... like today :)</h1>
      <AddTodo todos={todos} setTodos={setTodos} />
      <TodosContainer todos={todos} setTodos={setTodos} />
    </>
  );
}
