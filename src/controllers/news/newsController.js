import { News as NewsRepository } from "../../models/index.js";

async function findAllNews(request, response) {
	try {
		const news = await NewsRepository.findAll();
		response.status(200).json({ message: "Operação bem-sucedida", data: news });
	} catch (error) {
		console.log("Erro ao recuperar os registros de notícias:", error);
		response.status(500).json({ message: "Falha na operação", data: [] });
	}
}

async function findNews(request, response) {
	const newsID = request.params.id;

	try {
		const news = await NewsRepository.findByPk(newsID);
		response.status(200).json({ message: "Operação bem-sucedida", data: news });
	} catch (error) {
		console.log(
			`Erro ao recuperar o registro de notícia com id ${newsID}:`,
			error
		);
		response.status(500).json({ message: "Falha na operação", data: {} });
	}
}

async function createNews(request, response) {
	try {
		const newsCreated = await NewsRepository.create({
			titulo: request.body.titulo,
			conteudo: request.body.conteudo,
			categoria: request.body.categoria,
			author_id: request.body.author_id,
		});

		response
			.status(200)
			.json({ message: "Operação bem-sucedida", data: newsCreated });
	} catch (error) {
		console.log("Erro ao criar notícia:", error);
		response.status(500).json({ message: "Falha na operação", data: {} });
	}
}

async function updateNews(request, response) {
	const newsID = request.params.id;

	try {
		await NewsRepository.update(
			{
				titulo: request.body.titulo,
				conteudo: request.body.conteudo,
				categoria: request.body.categoria,
			},
			{
				where: {
					id: newsID,
				},
			}
		);

		const updatedNews = await NewsRepository.findByPk(newsID);
		response
			.status(200)
			.json({ message: "Operação bem-sucedida", data: updatedNews });
	} catch (error) {
		console.log(`Erro ao atualizar o autor com id ${newsID}:`);
		response.status(500).json({ message: "Falha na operação", data: {} });
	}
}

async function deleteNews(request, response) {
	const newsID = request.params.id;

	try {
		await NewsRepository.destroy({
			where: {
				id: newsID,
			},
		});

		const newsAfterDelete = await NewsRepository.findAll();
		response
			.status(200)
			.json({ message: "Operação bem-sucedida", data: newsAfterDelete });
	} catch (error) {
		console.log(`Erro ao tentar excluir a notícia com id ${newsID}:`, error);
		response.status(500).json({ message: "Falha na operação", data: [] });
	}
}

export default { findAllNews, findNews, createNews, updateNews, deleteNews };
