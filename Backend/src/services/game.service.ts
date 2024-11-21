import { Op } from "sequelize";
import { CreateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";
import User from "../models/user.model";

class GameService {
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    try {
      console.log("Creating game with data:", createGameDto);

      const game = await Game.create({
        player1_id: createGameDto.player1_id,
        game_state: createGameDto.initialState,
        is_public: createGameDto.is_public || false,
        status: "pending",
      });

      console.log("Game created:", game);
      return game;
    } catch (error) {
      console.error("Error in createGame:", error);
      throw error;
    }
  }

  async getGame(id: number): Promise<Game | null> {
    return Game.findByPk(id, {
      include: [
        {
          model: User,
          as: "player1",
          attributes: ["username"],
        },
        {
          model: User,
          as: "player2",
          attributes: ["username"],
        },
      ],
    });
  }

  async getPublicGames(): Promise<Game[]> {
    return Game.findAll({
      where: {
        is_public: true,
        status: "pending",
      },
      include: [
        {
          model: User,
          as: "player1",
          attributes: ["username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  async getGamesByPlayer(playerId: number): Promise<Game[]> {
    return Game.findAll({
      where: {
        [Op.or]: [{ player1_id: playerId }, { player2_id: playerId }],
      },
      include: [
        {
          model: User,
          as: "player1",
          attributes: ["username"],
        },
        {
          model: User,
          as: "player2",
          attributes: ["username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }
}

export default new GameService();
