import { config as loadConfig } from "https://deno.land/x/dotenv/mod.ts";

// this file loads the .env and sets up the config for the server
const cfg = loadConfig();

export const config = {
  PASSWORD_HASHING_SALT: cfg.PASSWORD_HASHING_SALT!,
  JWT_KEY: cfg.JWT_KEY!,
  PORT: Number(cfg.PORT),
  JWT_EXPIRATION_TIME: Number(cfg.JWT_EXPIRATION_TIME),
  MONGODB_URI: cfg.MONGODB_URI!,
  MONGODB_NAME: cfg.MONGODB_NAME!,
};
