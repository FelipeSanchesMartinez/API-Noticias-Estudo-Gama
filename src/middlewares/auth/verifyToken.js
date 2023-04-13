import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

function verifyToken(request, response, next) {
	const token = request.headers["x-access-token"];

	if (!token) {
		return response
			.status(403)
			.json({ message: "Falha na operação", data: "Nenhum token informado" });
	}

	jwt.verify(token, jwtSecret, function (err, decoded) {
		if (err) {
			return response.status(500).json({
				message: "Falha na operação",
				data: "Não foi possível autenticar o token enviado",
			});
		}

		request.id = decoded.id;
		next();
	});
}

export default verifyToken;
