import type { CreateGameDto, GameResponse } from "@/types/game.types";
import axiosInstance from "@/utils/axios";

export const gameService = {
  getInitialGameState(isSecondPlayerStarter: boolean) {
    return {
      pieces: this.getInitialPiecesPosition(),
      starter: isSecondPlayerStarter,
    };
  },

  getInitialPiecesPosition() {
    return {
      pieces: {},
    };
  },

  async createGame(gameData: CreateGameDto): Promise<GameResponse> {
    try {
      const payload = {
        username2: gameData.username2,
        who_start: gameData.who_start,
        game_state: JSON.stringify(gameData.game_state),
      };

      const response = await axiosInstance.post<GameResponse>(
        "/games",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la partie:", error);
      throw error;
    }
  },
};
