import Game from "./game.model";
import Move from "./move.model";
import User from "./user.model";

// Relations
Game.belongsTo(User, { as: "player1", foreignKey: "player1_id" });
Game.belongsTo(User, { as: "player2", foreignKey: "player2_id" });
Game.belongsTo(User, { as: "winner", foreignKey: "winner_id" });
Game.hasMany(Move, { foreignKey: "game_id" });

Move.belongsTo(Game, { foreignKey: "game_id" });
Move.belongsTo(User, { foreignKey: "player_id" });

export { Game, Move, User };
