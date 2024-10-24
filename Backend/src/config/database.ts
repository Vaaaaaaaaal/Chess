import path from "path";
import { Sequelize } from "sequelize";

const dbPath = path.join(__dirname, "..", "..", "Database.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // Désactivez les logs SQL si vous le souhaitez
});

export default sequelize;
