import { validationResult } from "express-validator";

function verifyBodyFieldsErrors(request, response, next) {
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		return response
			.status(400)
			.json({ message: "Falha na operação", data: errors.array() });
	}

	next();
}

export default verifyBodyFieldsErrors;
