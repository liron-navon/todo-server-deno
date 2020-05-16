import {
  MongoClient,
  init,
  Collection,
} from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { config } from "../config.ts";

await init();

export const client = new MongoClient();
export const db = client.database(config.MONGODB_NAME);

export let users: Collection;
export let todos: Collection;

// we want to initiate the connection and collections in a controlled time,
// to make it testable
export const initDatabaseConnection = () => {
  client.connectWithUri(config.MONGODB_URI);
  users = db.collection("users");
  todos = db.collection("todos");
};
