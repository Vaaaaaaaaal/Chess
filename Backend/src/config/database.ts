import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // Configuration spécifique pour SQLite
  dialectOptions: {
    // Activer le mode WAL (Write-Ahead Logging)
    pragma: {
      journal_mode: "WAL",
      busy_timeout: 6000,
      'foreign_keys': 'OFF'
    },
  },
});

export default sequelize;
