import { useEffect, useState } from "react";
import "./styles.css";

const CONSTANTS = {
  COLLECTIONS: {
    BUSINESS: "business",
    PERSONAL: "personal",
    OTHER: "other"
  },
  TIME_PERIOD: {
    FIVE_SECONDS: 1000 * 5,
    THIRTY_SECONDS: 1000 * 30,
    TWENTY_FOUR_HOURS: 1000 * 60 * 60 * 24,
    TWO_DAYS: 1000 * 60 * 60 * 24 * 2,
    FIVE_DAYS: 1000 * 60 * 60 * 24 * 5
  }
};

const collections = [
  CONSTANTS.COLLECTIONS.BUSINESS,
  CONSTANTS.COLLECTIONS.PERSONAL,
  CONSTANTS.COLLECTIONS.OTHER
];

function createTodo({
  text,
  isCompleted = false,
  collection,
  isDeleted = false
}) {
  return {
    text, // text of the todo
    isCompleted, // check box of todo
    createdTimestamp: Date.now(), // when todo is created
    collection,
    isDeleted
  };
}

export default function App() {
  const [text, setText] = useState("");
  const [collection, setCollection] = useState("Business");

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
        if (elapsed > CONSTANTS.TIME_PERIOD.FIVE_SECONDS) {
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
  console.log(collection);
  return (
    <>
      <h1 class="header">Procrastination ending soon... like today :)</h1>
      <label for="newTodo">Your New Todo</label>
      <input
        id="newTodo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        id="demo"
        onClick={function changeContent() {
          const newTodo = createTodo({ text, collection });
          // add todo into todos;
          todos.push(newTodo);
          setTodos([...todos]);
          // update State
        }}
      >
        Add
      </button>
      <p>Select a collection:</p>
      {collections.map((currentCollection) => (
        <div>
          <input
            type="radio"
            id={currentCollection}
            name="collection"
            value={currentCollection}
            checked={collection === currentCollection}
            onClick={() => setCollection(currentCollection)}
          />
          <label for={currentCollection}>{currentCollection}</label>
        </div>
      ))}
      <section id="todosContainer">
        {todos
          .filter((todo) => !todo.isDeleted)
          .map((todo) => (
            <p>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onClick={() => {
                  todo.isCompleted = !todo.isCompleted;
                  setTodos([...todos]);
                }}
              />
              {todo.text}
              <button
                onClick={() => {
                  todo.isDeleted = true;
                  setTodos([...todos]);
                }}
              >
                Delete
              </button>
            </p>
          ))}
      </section>
    </>
  );
}
