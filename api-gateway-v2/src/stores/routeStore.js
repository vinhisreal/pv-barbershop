const ServiceRoute = require("../models/ServiceRoute");
const chalk = require("chalk");

class RouteStore {
  constructor() {
    this._routes = [];
  }

  getAll() {
    return this._routes.slice();
  }

  setAll(routes) {
    this._routes = routes.slice().sort((a, b) => b.path.length - a.path.length);
    console.log(chalk.cyan("🔄 Routes loaded:"), this._routes);
  }

  async reloadFromDB() {
    const raw = await ServiceRoute.find().lean();
    this.setAll(
      raw.map((r) => ({
        path: r.path.replace(/\/+$/, ""),
        target: r.target.replace(/\/+$/, ""),
      }))
    );
  }

  addToCache(route) {
    const existsIdx = this._routes.findIndex((r) => r.path === route.path);
    if (existsIdx >= 0) {
      this._routes[existsIdx] = route;
    } else {
      this._routes.push(route);
    }
    this._routes.sort((a, b) => b.path.length - a.path.length);
  }

  removeFromCacheByPath(path) {
    this._routes = this._routes.filter((r) => r.path !== path);
  }

  match(url) {
    // longest prefix match
    return this._routes.find((r) => url.startsWith(r.path));
  }
}

module.exports = { RouteStore };
