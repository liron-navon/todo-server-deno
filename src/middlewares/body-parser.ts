import { Context } from "https://deno.land/x/oak/mod.ts";

/**
 * a middleware that defines how to parse different content
 */
export const bodyParser = async (ctx: Context, next: () => Promise<void>) => {
  const body = await ctx.request.body({
    contentTypes: {
      json: ["application/javascript"],
    },
  });
  ctx.state = {
    body: body.value,
  };
  return next();
};
