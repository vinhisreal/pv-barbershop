require("dotenv").config();

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const chalk = require("chalk");

const { connect } = require("./configs/db");
const { RouteStore } = require("./stores/routeStore");
const routesApi = require("./routes/service-route");
const { createDynamicProxy } = require("./proxy");
const { swaggerSpec } = require("./docs/swagger");
const swaggerUi = require("swagger-ui-express");

async function start() {
  const app = express();

  // CORS
  const origins = (process.env.CORS_ORIGINS || "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  app.use(
    cors({ origin: origins.includes("*") ? true : origins, credentials: true })
  );

  // Logging
  app.use(morgan(process.env.MORGAN_FORMAT || "tiny"));

  // Health
  app.get("/health", (_, res) => res.json({ ok: true, service: "gateway" }));

  // Swagger UI
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Initialize DB and routes store
  await connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);
  const routeStore = new RouteStore();
  await routeStore.reloadFromDB();

  // Dynamic proxy must receive RAW stream first, so DO NOT put global body parsers before it for /api prefix
  // Mount admin routes with JSON parser
  app.use("/routes", express.json(), routesApi);

  // Proxy middleware (only intercept /api/* or everything; here we intercept everything and rely on route match)
  const { middleware: proxyMiddleware, upgradeHandler } =
    createDynamicProxy(routeStore);
  app.use(proxyMiddleware);

  // Not found fallback (only hit when no route matched)
  app.use((req, res, next) => {
    res.status(404).json({ message: "No matching route and path" });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(chalk.red("❌ Error handler:"), err?.stack || err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err?.message || String(err),
    });
  });

  const server = http.createServer(app);

  // Optional: WebSocket/Socket.IO proxying
  server.on("upgrade", upgradeHandler);

  const PORT = Number(process.env.PORT || 5000);
  server.listen(PORT, () => {
    console.log(
      chalk.bold.green(`✅ API Gateway listening on http://localhost:${PORT}`)
    );
    console.log(
      chalk.bold.yellow(
        "ℹ️  Proxying based on DB: /api/v1/... matched to target origin, keeping path"
      )
    );
    console.log(
      chalk.bold.cyan(`📘 Swagger UI:`) +
        chalk.bold.cyan(` http://localhost:${PORT}/api/docs`)
    );
  });
}

start().catch((e) => {
  console.error("Failed to start gateway:", e);
  process.exit(1);
});
