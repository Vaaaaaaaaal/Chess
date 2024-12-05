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
      created_at: new Date()
    });

    return game;
  }
}

export default new GameService();
