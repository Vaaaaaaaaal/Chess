import path from "path";
import { Sequelize } from "sequelize";

const dbPath = path.join(__dirname, "..", "..", "Database.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 1,
  },
});

export default sequelize;
