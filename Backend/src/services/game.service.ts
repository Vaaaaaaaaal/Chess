import { CreateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";

class GameService {
  async createGame(
    player1_id: number,
    createGameDto: CreateGameDto
  ): Promise<Game> {
    const game = await Game.create({
      player1_id,
      username2: createGameDto.username2,
      winner_id: null,
      is_public: true,
      game_state: "en_cours",
      created_at: new Date(),
      who_start: createGameDto.who_start,
    });

    return game;
  }

  async getGameById(id: number): Promise<Game | null> {
    return Game.findByPk(id);
  }
}

export default new GameService();
