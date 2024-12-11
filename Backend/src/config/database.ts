import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  define: {
    timestamps: false,
  },
  storage: "./chessapp.sqlite",
});

export default sequelize;
