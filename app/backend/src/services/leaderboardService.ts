import Teams from '../database/models/teamsModel';
import Matches from '../database/models/matchesModel';

type Team = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
};

export default class LeaderboardService {
  private totalGames = async (id: number, path: 'homeTeamId' | 'awayTeamId') => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches.filter((e) => e[path] === id);
  };

  private async victories(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeamId') {
      return matches
        .filter((e) => e.homeTeamGoals > e.awayTeamGoals);
    }
    return matches.filter((a: Matches) => a.homeTeamGoals < a.awayTeamGoals);
  }

  private async draws(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const matches = await this.totalGames(id, path);
    return matches.filter((e) => e.homeTeamGoals === e.awayTeamGoals);
  }

  private async losses(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeamId') {
      return matches
        .filter((e) => e.homeTeamGoals < e.awayTeamGoals);
    }
    return matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
  }

  private async goalsFavor(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeamId') return matches.reduce((a, c) => a + c.homeTeamGoals, 0);
    return matches.reduce((a, c) => a + c.awayTeamGoals, 0);
  }

  private async goalsOwn(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeamId') return matches.reduce((a, c) => a + c.awayTeamGoals, 0);
    return matches.reduce((a, c) => a + c.homeTeamGoals, 0);
  }

  private async efficiency(id:number, path: 'homeTeamId' | 'awayTeamId') {
    const totalPoints = ((await this.victories(id, path)).length * 3)
        + (await this.draws(id, path)).length;
    const maxPointsPossible = (await this.totalGames(id, path)).length * 3;
    return ((totalPoints / maxPointsPossible) * 100).toFixed(2);
  }

  private sortLeaderboard = (arrInfoTeams: Array<Team>) => arrInfoTeams.sort(
    (a: Team, b: Team) => (b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn),
  );

  public getAllLeaderboard = async (path: 'homeTeamId' | 'awayTeamId') => {
    const getAllTeams = await Teams.findAll();
    const arrInfoTeams = await Promise.all(
      getAllTeams.map(async ({ id, teamName }) => ({
        name: teamName,
        totalPoints: ((await this.victories(id, path)).length * 3)
          + (await this.draws(id, path)).length,
        totalGames: (await this.totalGames(id, path)).length,
        totalVictories: (await this.victories(id, path)).length,
        totalDraws: (await this.draws(id, path)).length,
        totalLosses: (await this.losses(id, path)).length,
        goalsFavor: await this.goalsFavor(id, path),
        goalsOwn: await this.goalsOwn(id, path),
        goalsBalance: await this.goalsFavor(id, path) - await this.goalsOwn(id, path),
        efficiency: await this.efficiency(id, path),
      })),
    );
    const arrInfoTeamsSort = this.sortLeaderboard(arrInfoTeams);
    return { status: 200, response: arrInfoTeamsSort };
  };
}
