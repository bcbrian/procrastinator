import { Stack } from "@mui/material";
import { Todo } from "./Todo";

export function TodosContainer({ todos, setTodos }) {
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        alignItems: "stretch"
      }}
    >
      {todos
        .filter((todo) => !todo.isDeleted)
        .map((todo) => (
          <Todo todo={todo} todos={todos} setTodos={setTodos} />
        ))}
    </Stack>
  );
}
