import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function Todo({ todo, todos, setTodos }) {
  return (
    <Stack
      component={Paper}
      elevation={2}
      direction="row"
      spacing={2}
      justifyContent="space-between"
      sx={{
        maxWidth: "400px",
        padding: 1
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={todo.isCompleted}
            onClick={() => {
              todo.isCompleted = !todo.isCompleted;
              setTodos([...todos]);
            }}
          />
        }
        label={todo.text}
      />
      <IconButton
        aria-label="delete"
        onClick={() => {
          todo.isDeleted = true;
          setTodos([...todos]);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
