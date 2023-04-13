import express from "express";
import authRoutes from "./auth.js";
import authorsRoutes from "./authors.js";
import newsRoutes from "./news.js";
import healthRoutes from "./health.js";

const routes = express.Router();

routes.use("/login", authRoutes);
routes.use("/authors", authorsRoutes);
routes.use("/news", newsRoutes);
routes.use("/health", healthRoutes);

export default routes;
