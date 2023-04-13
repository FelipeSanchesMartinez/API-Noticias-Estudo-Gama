import express from "express";
import authController from "../controllers/auth/authController.js";

const routes = express.Router();

routes.post("/", authController.login);

export default routes;
