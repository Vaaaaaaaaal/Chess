import { DataTypes, Model } from "sequelize";
import db from "../config/database";

class Game extends Model {
  public id!: number;
  public player1_id!: number;
  public username2!: string;
  public winner_id!: number | null;
  public is_public!: boolean;
  public game_state!: string;
  public created_at!: Date;
  public who_start!: boolean;
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
      defaultValue: true,
    },
    game_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    who_start: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "games",
    timestamps: false,
  }
);

export default Game;
