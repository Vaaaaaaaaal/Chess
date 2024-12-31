<template>
  <Suspense>
    <template #fallback>
      <div class="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    </template>

    <div>
      <div class="list-users">
        <div class="turn-banner">
          <div class="player-info">
            <div class="player">
              <p class="player-name">{{ ownerUsername }}</p>
              <p class="player-color">{{ ownerColor }}</p>
            </div>

            <div class="turn-text">
              <h1>Au tour du {{ colorPlayer }} !</h1>
            </div>

            <div class="player">
              <p class="player-name">Invité</p>
              <p class="player-color">{{ guestColor }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-column align-items-center gap-4">
        <GameBoard
          :board="board"
          :colorPlayer="colorPlayer"
          :blackKilledPieces="blackKilledPieces"
          :whiteKilledPieces="whiteKilledPieces"
          :lastMove="lastMove"
          :possibleMoves="possibleMoves"
          :gameOverMessage="gameOverMessage"
          :showGameOverDialog="showGameOverDialog"
          :showPromotionDialog="showPromotionDialog"
          :availablePromotionPieces="availablePromotionPieces"
          @move="handleMove"
          @promote="handlePromotion"
          @goHome="goToHome"
          @selectPiece="handleSelectPiece"
        />

        <Button
          class="leave-game"
          style="color: white"
          label="Quitter la partie"
          @click="quitGame"
        />
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { deleteGame, getCurrentGame, getPossibleMoves, move, promote } from '@/api/gameService';
import { Color, FullPieceProperty, GameMoveDTO, PieceType, ResultPossible } from '@/types';
import { parsePieceKilled } from '@/utils/gameUtils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const board = ref<Case[][]>(initialBoard);
const colorPlayer = ref<'Noirs' | 'Blancs'>('Blancs');
const blackKilledPieces = ref<PieceType[]>([]);
const whiteKilledPieces = ref<PieceType[]>([]);
const ownerUsername = ref<string>(useUserService().getUsername());
const ownerColor = ref<'Noirs' | 'Blancs'>();
const guestColor = ref<'Noirs' | 'Blancs'>();
const possibleMoves = ref<PossibleMove[]>([]);
const lastMove = ref<GameMoveDTO | null>(null);

const showPromotionDialog = ref(false);
const showGameOverDialog = ref(false);
const gameOverMessage = ref('');
const promotionPosition = ref<{ i: number; j: number } | null>(null);
const availablePromotionPieces = ref<FullPieceProperty[]>([]);

const router = useRouter();
const toast = useToast();

onMounted(async () => {
  try {
    const response = await getCurrentGame();
    if (!response) {
      goToHome();
      return;
    }
    initializeGame(response);
  } catch (error) {
    handleError(error, 'Une erreur est survenue');
  }
});

const initializeGame = (response) => {
  blackKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.BLACK);
  whiteKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.WHITE);
  board.value = response.listCase;
  colorPlayer.value = response.turn === Color.BLACK ? 'Noirs' : 'Blancs';
  guestColor.value = response.ownerColor === Color.BLACK ? 'Blancs' : 'Noirs';
  ownerColor.value = response.ownerColor === Color.BLACK ? 'Noirs' : 'Blancs';
  handleGameResult(response, -1, -1);
};

const handleMove = async (moveData: GameMoveDTO) => {
  try {
    const response = await move(moveData);
    if (response.success) {
      updateGameState(response, moveData);
    } else {
      showMoveError(response.error);
    }
  } catch (error) {
    handleError(error, 'Une erreur est survenue');
  }
};

const updateGameState = (response, moveData) => {
  lastMove.value = moveData;
  board.value = response.listCase;
  colorPlayer.value = response.turn === Color.BLACK ? 'Noirs' : 'Blancs';
  blackKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.BLACK);
  whiteKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.WHITE);
  possibleMoves.value = [];
  handleGameResult(response, moveData.toI + 1, moveData.toJ + 1);
};

const showMoveError = (error) => {
  const errorMessages = {
    [MoveError.INVALID_TURN]: "Ce n'est pas votre tour",
    [MoveError.INVALID_MOVE]: "Ce mouvement n'est pas valide",
    [MoveError.KING_IN_CHECK]: "Ce mouvement mettrait votre roi en échec",
    [MoveError.MUST_PROTECT_KING]: "Vous devez protéger votre roi",
    [MoveError.MUST_MOVE_KING]: "Votre roi est en échec, vous devez le déplacer"
  };
  toast.add({
    severity: error === MoveError.KING_IN_CHECK ? 'warn' : 'error',
    summary: 'Mouvement invalide',
    detail: errorMessages[error] || 'Veuillez réessayer',
    life: 3000
  });
};

const handlePromotion = async (pieceType: PieceType) => {
  if (!promotionPosition.value) return;
  try {
    const response = await promote(pieceType);
    if (response.success) {
      showPromotionDialog.value = false;
      promotionPosition.value = null;
      board.value = response.listCase;
      blackKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.BLACK);
      whiteKilledPieces.value = parsePieceKilled(response.pieceKilled, Color.WHITE);
    }
  } catch (error) {
    handleError(error, 'Erreur lors de la promotion');
  }
};

const handleSelectPiece = async (position: { row: number; col: number } | null) => {
  if (position === null) {
    possibleMoves.value = [];
    return;
  }
  try {
    const movesResponse = await getPossibleMoves({ i: position.row, j: position.col });
    possibleMoves.value = movesResponse;
  } catch (error) {
    handleError(error, 'Impossible de récupérer les mouvements possibles');
  }
};

const goToHome = () => {
  router.push('/');
};

const handleGameResult = (game: GameModel, row: number, col: number) => {
  if (game.result && game.result.length > 0) {
    for (const resultStr of game.result) {
      const [result, color] = resultStr.split(':') as [ResultPossible, Color];
      switch (result) {
        case ResultPossible.KINGLOSE:
          gameOverMessage.value = `Les ${color === Color.BLACK ? 'Blancs' : 'Noirs'} ont gagné !`;
          showGameOverDialog.value = true;
          break;
        case ResultPossible.PROMOTION:
          if (row === -1 || col === -1) return;
          promotionPosition.value = { i: row - 1, j: col - 1 };
          availablePromotionPieces.value = color === Color.BLACK
            ? blackKilledPieces.value.filter((piece) => piece != PieceType.PAWN).map((piece) => `BLACK_${piece}` as FullPieceProperty)
            : whiteKilledPieces.value.filter((piece) => piece != PieceType.PAWN).map((piece) => `WHITE_${piece}` as FullPieceProperty);
          showPromotionDialog.value = true;
          break;
        case ResultPossible.KINGMOVE:
          toast.add({
            severity: 'warn',
            summary: 'Attention',
            detail: 'Votre roi est en danger ! Vous devez le déplacer.',
            life: 3000,
          });
          break;
      }
    }
  }
};

const quitGame = async () => {
  try {
    await deleteGame();
    goToHome();
  } catch (error) {
    handleError(error, 'Erreur lors de la suppression de la partie');
  }
};

const handleError = (error, message) => {
  console.error(error);
  toast.add({
    severity: 'error',
    summary: 'Erreur',
    detail: message,
    life: 5000,
  });
  if (error instanceof AxiosError && error?.response?.status === 404) {
    router.push('/');
  }
};
</script>
