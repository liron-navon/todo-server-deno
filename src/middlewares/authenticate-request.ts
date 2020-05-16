import { validateToken, TokenData } from "../business-logic/auth/tokens.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";
import { ErrorStatus } from "https://deno.land/x/oak/types.ts";
import { findUserBySession } from "../db/users.ts";

/**
 * a middleware to handle authentication for incoming requests
 */
export const authMiddleware = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  const token = ctx.cookies.get("auth-token");
  if (!token) {
    ctx.throw(ErrorStatus.Unauthorized);
  }

  const tokenValidation = await validateToken(token);
  if (!tokenValidation) {
    ctx.throw(ErrorStatus.Unauthorized);
  }

  const { session } = JSON.parse(
    (tokenValidation.payload as Record<string, any>).data,
  ) as TokenData;

  const user = await findUserBySession(session);

  if (!user) {
    ctx.throw(ErrorStatus.Unauthorized);
  }

  ctx.state.user = user;
  return next();
};
