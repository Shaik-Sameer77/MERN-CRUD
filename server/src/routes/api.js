import express from "express";
import Login from "../controllers/login.controller.js";
import Register from "../controllers/Register.controller.js";
import { LoginSchema } from "../ValidationSchema/LoginSchema.js";
import { RegisterSchema } from "../ValidationSchema/RegisterSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";
import { EditTodo } from "../controllers/Edit.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

// protected routes;

apiProtected.post(
  "/createTodo",
  [check("desc", "Todo desc is required").exists()],
  createTodo
);

apiProtected.post(
  "/marktodo",
  [check("todo_id", "Todo id is required").exists()],
  MarkTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo desc is required").exists()],
  RemoveTodo
);

apiProtected.put(
  "/editTodo/:todo_id",
  [check("desc", "Todo desc is required").exists()],
  EditTodo
);


apiProtected.get("/todolist", GetTodos);

export default apiRoute;
