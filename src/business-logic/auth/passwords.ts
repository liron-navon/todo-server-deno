import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { config } from "../../config.ts";

const passwordSalt = config.PASSWORD_HASHING_SALT;

export const hashPassword = (plainText: string) =>
  bcrypt.hashpw(plainText, passwordSalt);

export const checkPassword = (plain: string, hash: string) =>
  bcrypt.checkpw(plain, hash);
