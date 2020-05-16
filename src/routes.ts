import { Router, Status } from "https://deno.land/x/oak/mod.ts";
import { authMiddleware } from "./middlewares/authenticate-request.ts";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  listTodos,
  updateTodo,
} from "./handlers/todo/todo.ts";
import { login, logout, register } from "./handlers/auth/auth.ts";

export const router = new Router();

// routes for authentication
router.get("/auth/logout", authMiddleware, logout);
router.post("/auth/register", register);
router.post("/auth/login", login);

// routes for todo
router.get("/todo", authMiddleware, listTodos);
router.post("/todo", authMiddleware, createTodo);
router.get("/todo/:id", authMiddleware, getTodoById);
router.delete("/todo/:id", authMiddleware, deleteTodo);
router.put("/todo/:id", authMiddleware, updateTodo);
