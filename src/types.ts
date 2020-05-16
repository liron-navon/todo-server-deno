import { User } from "./db/users.ts";

export interface ContextState {
  body?: any;
  user?: User;
}
