import { Context, isHttpError, Status } from "https://deno.land/x/oak/mod.ts";
import { ErrorStatus } from "https://deno.land/x/oak/types.ts";

/**
 * a middleware to catch and handle errors
 */
export const errorsHandler = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (err) {
    console.error("Server Error:", err.message);

    // http error
    if (isHttpError(err)) {
      const errorStatus = err.status as unknown ||
        ErrorStatus.InternalServerError;
      ctx.response.status = errorStatus as Status;
      if (err.message) {
        ctx.response.body = err.message;
      }
      // validation error
    } else if (err.name === "ValueSchemaError") {
      console.log(`validation error: ${JSON.stringify(err)}`);
    } else {
      // unknown internal error
      ctx.response.status = Status.InternalServerError;
    }
  }
};
