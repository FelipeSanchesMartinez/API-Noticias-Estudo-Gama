import express from "express";
import newsController from "../controllers/news/newsController.js";

const routes = express.Router();

// Rotas de notícias
routes.get("/", newsController.findAllNews);
routes.post("/", newsController.createNews);
routes.get("/:id", newsController.findNews);
routes.put("/:id", newsController.updateNews);
routes.delete("/:id", newsController.deleteNews);

export default routes;
