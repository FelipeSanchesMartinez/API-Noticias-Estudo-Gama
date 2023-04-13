import { Author as AuthorRepository } from "../../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

async function login(request, response) {
	try {
		const { email, password } = request.body;

		const author = await AuthorRepository.findOne({
			where: { email },
		});

		if (!author) {
			return response
				.status(404)
				.json({ message: "Falha na operação", data: "Usuário não encontrado" });
		}

		const passwordIsValid = bcrypt.compareSync(password, author.password);

		if (!passwordIsValid) {
			return response.status(401).json({
				message: "Falha na operação",
				data: "Usuário não autorizado",
			});
		}

		const token = jwt.sign({ id: author.id }, jwtSecret, {
			expiresIn: 86400, // EXPIRA EM 24 horas
		});

		return response.status(200).json({
			message: "Operação bem-sucedida",
			data: {
				token: token,
			},
		});
	} catch (error) {
		console.error("Erro na operação de login:", error);
		return response
			.status(500)
			.json({ message: "Falha na operação", data: {} });
	}
}

export default { login };
