import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

class Game extends Model {
  public id!: number;
  public player1_id!: number;
  public player2_id!: number | null;
  public winner_id!: number | null;
  public is_public!: boolean;
  public status!: "pending" | "active" | "completed" | "abandoned";
  public current_turn!: number;
  public game_state!: string;
  public created_at!: Date;
  public updated_at!: Date;
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
      references: {
        model: User,
        key: "id",
      },
    },
    player2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    winner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "completed", "abandoned"),
      defaultValue: "pending",
    },
    current_turn: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // 1 pour player1, 2 pour player2
    },
    game_state: {
      type: DataTypes.TEXT,
      allowNull: false, // État du plateau en JSON
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default Game;
