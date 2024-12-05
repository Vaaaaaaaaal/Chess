import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Game extends Model {
  public id!: number;
  public player1_id!: number;
  public username2!: string;
  public winner_id!: boolean | null;
  public is_public!: boolean;
  public game_state!: string;
  public created_at!: Date;
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    winner_id: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    game_state: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("game_state");
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue("game_state", JSON.stringify(value));
      },
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
