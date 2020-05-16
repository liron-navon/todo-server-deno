import { Application, Body } from "https://deno.land/x/oak/mod.ts";
import { bodyParser } from "./middlewares/body-parser.ts";
import { errorsHandler } from "./middlewares/errors-handler.ts";
import { config } from "./config.ts";
import { router } from "./routes.ts";
import { ContextState } from "./types.ts";
import { initDatabaseConnection } from "./db/db.ts";

const app: Application = new Application<ContextState>();

app.use(bodyParser);
app.use(errorsHandler);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`the server is running at http://localhost:${config.PORT}`);

initDatabaseConnection();
await app.listen({ port: config.PORT });
