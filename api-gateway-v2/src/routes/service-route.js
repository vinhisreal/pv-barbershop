const express = require("express");
const chalk = require("chalk");
const ServiceRoute = require("../models/ServiceRoute");

const router = express.Router();

/**
 * List all routes
 */
router.get("/", async (req, res, next) => {
  try {
    const routes = await ServiceRoute.find().sort({ path: 1 }).lean();
    res.json(routes);
  } catch (err) {
    next(err);
  }
});

/**
 * Create or upsert a route
 * body: { path: "/api/v1/invoice", target: "http://localhost:5003" }
 */
router.post("/", async (req, res, next) => {
  try {
    let { path, target } = req.body || {};
    if (!path || !target) {
      return res.status(400).json({ message: "path and target are required" });
    }
    if (!path.startsWith("/")) path = `/${path}`;
    path = path.replace(/\/+$/, ""); // trim trailing slash
    target = target.replace(/\/+$/, ""); // origin only

    const doc = await ServiceRoute.findOneAndUpdate(
      { path },
      { $set: { path, target } },
      { new: true, upsert: true }
    );

    console.log(chalk.cyan("🆕 Upsert route:"), doc);
    res.status(201).json(doc);
  } catch (err) {
    // handle duplicate key on unique index
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Route already exists", keyValue: err.keyValue });
    }
    next(err);
  }
});

/**
 * Delete a route by id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ServiceRoute.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Route not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
