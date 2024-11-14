import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Move extends Model {
  public id!: number;
  public game_id!: number;
  public move_number!: number;
  public move!: string;
  public readonly created_at!: Date;
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
    },
    move_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    move: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
