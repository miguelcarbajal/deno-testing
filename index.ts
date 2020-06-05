import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import { router } from "./routes/index.routes.ts";

const app: Application = new Application()

app.use(router.routes())

console.log('Deno Server on port 3000')
await app.listen({ port: 3000 })
