import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import { ICreated, IError, IInfo, IMatch } from '../interfaces/IMatches';

export default class MatchesService {
  public getAllMatches = async () => {
    const matches = await Matches
      .findAll({
        include: [
          { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });

    if (!matches) {
      return { status: 404, response: 'Matches not found' };
    }

    return { status: 200, response: matches };
  };

  public getMatchesByProgress = async (inProgress: boolean) => {
    const matches = await Matches
      .findAll({
        include: [
          { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        ],
        where: { inProgress },
      });

    return { status: 200, response: matches };
  };

  public createMatches = async (newMatch: IMatch): Promise<ICreated | IError> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;
    const home = await Matches
      .findOne({ where: { homeTeamId } });
    const away = await Matches
      .findOne({ where: { awayTeamId } });

    if (!away || !home) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    const data = await Matches
      .create({
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });

    return data;
  };

  public updateMatches = (id: number, newInfo: IInfo): Promise<number[]> =>
    Matches
      .update(
        {
          homeTeamGoals: newInfo.homeTeamGoals,
          awayTeamGoals: newInfo.awayTeamGoals,
        },
        { where: { id } },
      );

  public finishMatches = (id: number): Promise<number[]> =>
    Matches
      .update({ inProgress: false }, { where: { id } });
  ;
}
