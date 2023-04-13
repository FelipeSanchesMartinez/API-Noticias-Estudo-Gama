import app from "./app.js";
import db from "./configs/database.js";

try {
	await db.sync({ alter: true });
	console.log("A conexão com o banco de dados foi bem sucedida!");

	app.listen(3333, () => {
		console.log("Servidor iniciado na porta 3333");
	});
} catch (error) {
	console.log("Não foi possível se conectar com o banco de dados:", error);
	process.exit(1);
}
