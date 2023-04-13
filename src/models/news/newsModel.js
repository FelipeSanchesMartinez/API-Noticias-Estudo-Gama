import { Sequelize } from "sequelize";
import Author from "../authors/authorsModel.js";
import db from "../../configs/database.js";

const News = db.define(
	"news",
	{
		id: {
			type: Sequelize.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		titulo: {
			type: Sequelize.STRING(155),
			allowNull: false,
		},
		conteudo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		categoria: {
			type: Sequelize.ENUM("esportes", "policiais", "culinária", "gerais"),
			allowNull: false,
		},
		author_id: {
			type: Sequelize.INTEGER.UNSIGNED,
			references: {
				model: Author,
				key: "id",
			},
			allowNull: false,
		},
	},
	{
		tableName: "news",
	}
);

export default News;
