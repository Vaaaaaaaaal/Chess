import { gameService } from "@/services/game.service";
import type { CreateGameDto, GameResponse } from "@/types/game.types";
import { ref } from "vue";

export function useGame() {
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const createGame = async (
    gameData: CreateGameDto
  ): Promise<GameResponse | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const initialGameState = gameService.getInitialGameState(
        gameData.starter
      );
      const response = await gameService.createGame({
        ...gameData,
        game_state: initialGameState,
      });
      return response;
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        "Erreur lors de la création de la partie";
      if (err.response?.status === 401) {
        error.value = "Veuillez vous connecter pour créer une partie";
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createGame,
    error,
    isLoading,
  };
}
