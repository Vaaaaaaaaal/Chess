import type { GameResponse, CreateGameDto } from "@/types/game.types";
import axios from "axios";

export const gameService = {
  async createGame(gameData: CreateGameDto): Promise<GameResponse> {
    try {
      const response = await axios.post<GameResponse>(
        "http://localhost:3000/games",
        gameData
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la partie:", error);
      throw error;
    }
  },
};
