import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Game extends Model {
  public id!: number;
  public player1_id!: number;
  public username2!: string;
  public winner_id!: number | null;
  public is_public!: boolean;
  public game_state!: string;
  public readonly created_at!: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    player1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    winner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    game_state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: false,
  }
);

export default Game;
