import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import { useState, forwardRef } from "react";
import { collections, createTodo } from "../utils/todos";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddTodo({ todos, setTodos }) {
  const [text, setText] = useState("");
  const [collection, setCollection] = useState("Business");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Todo
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create New Todo
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={function changeContent() {
                const newTodo = createTodo({ text, collection });
                // add todo into todos;
                todos.push(newTodo);
                setTodos([...todos]);
                handleClose();
                // update State
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <label for="newTodo">Your New Todo</label>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%"
          }}
        >
          <TextField
            fullWidth
            label="Your New Todo"
            id="fullWidth"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="filled"
            size="large"
          />
        </Box>

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
      </Dialog>
    </>
  );
}
