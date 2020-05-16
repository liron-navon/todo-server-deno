import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import {
  checkPassword,
  hashPassword,
} from "../../business-logic/auth/passwords.ts";
import {
  createToken,
  setTokenCookie,
  deleteTokenCookie,
} from "../../business-logic/auth/tokens.ts";
import { createSessionId } from "../../business-logic/auth/session.ts";
import { ErrorStatus } from "https://deno.land/x/oak/types.ts";
import { findUserByEmail, createUser, updateUser } from "../../db/users.ts";
import { validateUser } from "./validations.ts";

export const logout = async (ctx: RouterContext) => {
  const user = ctx.state.user;
  await updateUser(user._id, {
    session: null,
  });
  deleteTokenCookie(ctx);
  ctx.response.body = "OK";
};

export const register = async (ctx: RouterContext) => {
  const { email, password } = validateUser(ctx.state.body);

  // check if the user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    ctx.throw(ErrorStatus.Conflict);
  }

  const userSession = createSessionId();
  // create a new user, and use it's id to create a token
  await createUser({
    email,
    session: userSession.toString(),
    password: hashPassword(password),
  });
  const token = createToken({
    session: userSession,
  });
  setTokenCookie(ctx, token);
  ctx.response.body = "OK";
};

export const login = async (ctx: RouterContext) => {
  const { email, password } = validateUser(ctx.state.body);

  const user = await findUserByEmail(email);
  if (!user) {
    console.log("user email doesn't exist");
    ctx.throw(ErrorStatus.Unauthorized);
  }

  if (!checkPassword(password, user.password)) {
    console.log("user password is wrong");
    ctx.throw(ErrorStatus.Unauthorized);
  } else {
    // create a fresh token for the user
    user.session = createSessionId();
    await updateUser(user._id, {
      session: user.session,
    });
    const token = createToken({
      session: user.session,
    });
    setTokenCookie(ctx, token);
    ctx.response.body = "OK";
  }
};
