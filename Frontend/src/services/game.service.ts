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
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(gameData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la partie');
      }

      return response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la partie:", error);
      throw error;
    }
  },

  async getGame(gameId: number): Promise<GameResponse> {
    try {
      const response = await axiosInstance.get<GameResponse>(
        `/games/${gameId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la partie:", error);
      throw error;
    }
  },

  async getPossibleMoves(gameId: number, position: string): Promise<string[]> {
    try {
      const response = await axiosInstance.get<string[]>(
        `/games/${gameId}/possible-moves/${position.toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des mouvements possibles:",
        error
      );
      return [];
    }
  },
};
