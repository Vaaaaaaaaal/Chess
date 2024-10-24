import Game from "../models/game.model";

class GameService {
  async createGame(
    player1_id: number,
    username2: string,
    initialState: string,
    is_public?: boolean
  ): Promise<Game> {
    return Game.create({
      player1_id,
      username2,
      game_state: initialState,
      is_public: is_public || false,
    });
  }

  async getGame(id: number): Promise<Game | null> {
    return Game.findByPk(id);
  }

  async getAllGames(): Promise<Game[]> {
    return Game.findAll();
  }

  async updateGame(
    id: number,
    gameData: Partial<Game>
  ): Promise<[number, Game[]]> {
    return Game.update(gameData, { where: { id }, returning: true });
  }

  async deleteGame(id: number): Promise<number> {
    return Game.destroy({ where: { id } });
  }

  async getPublicGames(): Promise<Game[]> {
    return Game.findAll({ where: { is_public: true } });
  }
}

export default new GameService();
