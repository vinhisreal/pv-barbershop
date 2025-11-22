const http = require("http");
const httpProxy = require("http-proxy");
const chalk = require("chalk");

/**
 * Create a dynamic proxy that:
 * - For each incoming request, finds the longest matching route by req.url prefix
 * - Forwards the request to route.target, keeping the original path intact
 * - Streams body (POST/PUT) correctly (no body-parser in front)
 */
function createDynamicProxy(routeStore) {
  const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: 30_000,
    timeout: 30_000,
  });

  proxy.on("error", (err, req, res) => {
    console.error(
      chalk.red("❌ Proxy error:"),
      err?.stack || err?.message || err
    );
    if (!res.headersSent) {
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Bad gateway",
          error: err?.message || String(err),
        })
      );
    } else {
      try {
        res.end();
      } catch {}
    }
  });

  const middleware = (req, res, next) => {
    const url = req.originalUrl || req.url;
    const method = req.method;
    const match = routeStore.match(url);

    if (!match) return next();

    const target = match.target; // origin only (http://localhost:5003)
    const forwardUrl = `${target}${url}`;
    console.log(
      chalk.green("➡️ Proxy:"),
      chalk.blueBright(`${method} ${url}`),
      chalk.white("→"),
      chalk.magenta(forwardUrl)
    );

    // Keep the original path; http-proxy uses req.url as-is
    proxy.web(req, res, { target });
  };

  // Optional: WebSocket/Socket.IO upgrade support
  const upgradeHandler = (req, socket, head) => {
    const url = req.url || "";
    const match = routeStore.match(url);
    if (!match) return socket.destroy();

    const target = match.target;
    console.log(
      chalk.green("🔁 WS Proxy:"),
      chalk.blueBright(`GET ${url}`),
      chalk.white("→"),
      chalk.magenta(`${target}${url}`)
    );
    proxy.ws(req, socket, head, { target });
  };

  return { middleware, upgradeHandler };
}

module.exports = { createDynamicProxy };
