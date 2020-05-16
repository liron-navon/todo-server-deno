import { db, todos } from "./db.ts";
import {
  UpdateResult,
  ObjectId,
} from "https://deno.land/x/mongo@v0.6.0/mod.ts";

export interface Todo {
  text: string;
  done: boolean;
  _id?: string;
  userId: string;
}

export const createTodo = (todo: Todo): Promise<ObjectId> =>
  todos.insertOne(todo);

export const findTodoById = (_id: string, userId: string): Promise<Todo> =>
  todos.findOne({ _id, userId });

export const findAllTodosForUser = (userId: string): Promise<Todo[]> =>
  todos.find({ userId });

export const updateTodo = (
  _id: string,
  userId: string,
  updates: Partial<Todo>,
): Promise<UpdateResult> =>
  todos.updateOne(
    { _id, userId },
    { $set: updates },
  );

export const deleteTodo = (_id: string, userId: string): Promise<any> =>
  todos.deleteOne({ _id, userId });
