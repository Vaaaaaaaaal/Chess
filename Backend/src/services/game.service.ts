import { CreateGameDto } from "../dto/game.dto";
import Game from "../models/game.model";

class GameService {
  async createGame(
    player1_id: number,
    createGameDto: CreateGameDto
  ): Promise<Game> {
    const initialGameState = {
      board: this.getInitialBoardState(),
      currentTurn: player1_id,
      starter: createGameDto.starter
    };

    return await Game.create({
      player1_id,
      username2: createGameDto.username2,
      game_state: JSON.stringify(initialGameState),
      winner_id: null,
    });
  }

  private getInitialBoardState() {
    return {
      pieces: {
        a1: { type: "rook", color: "white" },
        b1: { type: "knight", color: "white" },
        // ... autres pièces initiales
      },
    };
  }
}

export default new GameService();
