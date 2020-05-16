import { db, users } from "./db.ts";
import {
  UpdateResult,
  ObjectId,
} from "https://deno.land/x/mongo@v0.6.0/mod.ts";

export interface User {
  email: string;
  password: string;
  session: string | null;
  _id: string;
}

export const updateUser = (
  _id: string,
  updates: Partial<User>,
): Promise<UpdateResult> =>
  users.updateOne(
    { _id },
    { $set: updates },
  );

export const createUser = (user: Partial<User>): Promise<ObjectId> =>
  users.insertOne(user);

export const findUserBySession = (session: string): Promise<User | undefined> =>
  users.findOne({ session });

export const findUserByEmail = (email: string): Promise<User | undefined> =>
  users.findOne({ email });
