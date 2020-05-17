import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { ContextState } from "../../types.ts";
import { validateUpdateTodo, validateCreateTodo } from "./validations.ts";
import * as todos from "../../db/todos.ts";

// returns a list of todos
export const listTodos = async (ctx: RouterContext<any, ContextState>) => {
  const user = ctx.state.user!;
  ctx.response.body = await todos.findAllTodosForUser(user._id);
};

// creates a new todo
export const createTodo = async (ctx: RouterContext<any, ContextState>) => {
  const user = ctx.state.user!;
  const todo = validateCreateTodo(ctx.state.body);
  ctx.response.body = await todos.createTodo(user._id,  todo.text);
};

// gets a single todo by ID
export const getTodoById = async (
  ctx: RouterContext<{ id: string }, ContextState>,
) => {
  const user = ctx.state.user!;
  const id = ctx.params.id;
  ctx.response.body = await todos.findTodoById(id, user._id);
};

// delete todo by id
export const deleteTodo = async (
  ctx: RouterContext<{ id: string }, ContextState>,
) => {
  const user = ctx.state.user!;
  const id = ctx.params.id;
  ctx.response.body = await todos.deleteTodo(id, user._id);
};

// update todo
export const updateTodo = async (
  ctx: RouterContext<{ id: string }, ContextState>,
) => {
  const user = ctx.state.user!;
  const id = ctx.params.id;
  const updates = validateUpdateTodo(ctx.state.body);
  ctx.response.body = await todos.updateTodo(id, user._id, updates);
};
