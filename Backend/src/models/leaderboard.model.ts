import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Leaderboard extends Model {
  public id!: number;
  public user_id!: number;
  public total_games!: number;
  public wins!: number;
  public losses!: number;
  public draws!: number;
}

Leaderboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_games: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    draws: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Leaderboard",
    tableName: "leaderboard",
    timestamps: false,
  }
);

export default Leaderboard;
