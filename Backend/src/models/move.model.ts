import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Game from "./game.model";

class Move extends Model {
  public id!: number;
  public game_id!: number;
  public player_id!: number;
  public from_position!: string;
  public to_position!: string;
  public piece_type!: string;
  public captured_piece?: string;
  public is_check!: boolean;
  public is_checkmate!: boolean;
  public move_number!: number;
  public created_at!: Date;
  public promotion?: string;
}

Move.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_position: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    to_position: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    piece_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    captured_piece: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    is_check: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_checkmate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    move_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    promotion: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Move",
    tableName: "moves",
    timestamps: false,
  }
);

export default Move;
