import express from "express";
import authorController from "../controllers/authors/authorsController.js";

import verifyToken from "../middlewares/auth/verifyToken.js";
import verifyBodyFieldsErrors from "../middlewares/validations/bodyValidations.js";
import { body } from "express-validator";

const routes = express.Router();

// Rotas de autores
routes.get("/", authorController.findAllAuthors); // Consultar um recurso

routes.post(
	"/",
	body("name").isString(),
	body("bio").isString(),
	body("email").isEmail(),
	body("password")
		.isLength({ min: 8 })
		.withMessage("A senha deve ser informada (mínimo de 8 caracteres)"),
	verifyBodyFieldsErrors,
	authorController.addAuthor
); // Criar um recurso

routes.get("/:id", verifyToken, authorController.findAuthor); // Consultar um recurso
routes.put("/:id", verifyToken, authorController.updateAuthor); // Atualizar totalmente um recurso
routes.delete("/:id", authorController.deleteAuthor); // Excluir um recurso

export default routes;
