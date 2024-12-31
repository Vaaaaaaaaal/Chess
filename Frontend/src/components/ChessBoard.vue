// ... existing code ...
export class GameStateManager {
  private currentState: GameModel;
  private moveHistory: GameModel[] = [];
  private currentIndex: number = -1;

  constructor(initialState: GameModel) {
    this.currentState = initialState;
    this.saveState(initialState);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    gameBus.on('move:piece', ({ from, to }) => {
      this.recordMove(from, to);
    });

    gameBus.on('game:updated', (newState) => {
      this.updateState(newState);
    });

    gameBus.on('game:undo', () => {
      this.undo();
    });

    gameBus.on('game:redo', () => {
      this.redo();
    });
  }

  private saveState(state: GameModel): void {
    this.currentIndex++;
    // Supprimer tous les états après l'index actuel
    this.moveHistory = this.moveHistory.slice(0, this.currentIndex);
    this.moveHistory.push(JSON.parse(JSON.stringify(state)));
  }

  private updateState(newState: GameModel): void {
    this.currentState = newState;
    this.saveState(newState);
    this.checkGameStatus();
  }

  public undo(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const previousState = this.moveHistory[this.currentIndex];
      this.currentState = JSON.parse(JSON.stringify(previousState));
      gameBus.emit('game:state-changed', this.currentState);
    }
  }

  public redo(): void {
    if (this.currentIndex < this.moveHistory.length - 1) {
      this.currentIndex++;
      const nextState = this.moveHistory[this.currentIndex];
      this.currentState = JSON.parse(JSON.stringify(nextState));
      gameBus.emit('game:state-changed', this.currentState);
    }
  }

  public canUndo(): boolean {
    return this.currentIndex > 0;
  }

  public canRedo(): boolean {
    return this.currentIndex < this.moveHistory.length - 1;
  }

  private checkGameStatus(): void {
    if (this.currentState.result?.includes('KINGLOSE')) {
      const winner = this.currentState.turn === 'WHITE' ? 'BLACK' : 'WHITE';
      gameEvents.gameOver(winner);
    }

    if (this.currentState.result?.includes('CHECK')) {
      gameEvents.checkDetected(this.currentState.turn);
    }

    if (this.currentState.result?.includes('STALEMATE')) {
      gameEvents.gameOver('DRAW');
      gameBus.emit('game:stalemate');
    }
  }
}
// ... existing code ...