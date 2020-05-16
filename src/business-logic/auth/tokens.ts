import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
} from "https://deno.land/x/djwt/create.ts";
import { config } from "../../config.ts";

const jwtHeader: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const jwtKey = config.JWT_KEY;
const tokenMaxAge = config.JWT_EXPIRATION_TIME;

export interface TokenData {
  session: string;
}

// we delete the cookie by setting the age to 0
export const deleteTokenCookie = (ctx: Context) => {
  ctx.cookies.set("auth-token", "", {
    httpOnly: true,
    overwrite: true,
    maxAge: 0,
  });
};

export const setTokenCookie = (ctx: Context, token: string) => {
  ctx.cookies.set("auth-token", token, {
    httpOnly: true,
    overwrite: true,
  });
};

export const createToken = (data: TokenData) => {
  const payload = {
    data: JSON.stringify(data),
    exp: setExpiration(
      new Date().getTime() + tokenMaxAge,
    ),
  };
  return makeJwt({
    header: jwtHeader,
    payload,
    key: jwtKey,
  });
};

export const validateToken = (token: string) => {
  return validateJwt(token, jwtKey, { isThrowing: false });
};
