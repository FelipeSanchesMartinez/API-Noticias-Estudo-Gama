import express from "express";

const routes = express.Router();

// Rota de health
routes.get("/", (request, response) => {
	response
		.status(200)
		.json({ message: "Operação bem-sucedida", data: "API em funcionamento" });
});

export default routes;
