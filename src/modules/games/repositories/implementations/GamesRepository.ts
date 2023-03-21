import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder('games')
      .select()
      .where(`games.title ILIKE '%${param}%'`)
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const count = await this.repository.query('SELECT COUNT(*) FROM games');
    
    return count
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const response = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", 'users')
      .where("games.id = :id", { id })
      .getOne();

    return response?.users || [];
  }
}
