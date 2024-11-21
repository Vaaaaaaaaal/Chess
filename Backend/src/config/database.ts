import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./Database.db",
  logging: (sql) => {
    console.log("🔍 Requête SQL exécutée:");
    console.log(sql);
  },
});

export default sequelize;
