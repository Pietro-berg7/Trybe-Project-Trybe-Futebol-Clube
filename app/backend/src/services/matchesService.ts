import { Op } from 'sequelize';
import {
  IInfo,
  IMatch,
  ICreated,
  IError,
} from '../interfaces/IMatches';
import Teams from '../database/models/teamsModel';
import MatchesModel from '../database/models/matchesModel';

class MatchesService {
  public getAllMatches = async () => MatchesModel.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  public getMatchesByProgress = async (inProgress: string) => {
    let progress;

    if (inProgress === 'true') {
      progress = true;
    }

    if (inProgress === 'false') {
      progress = false;
    }

    return MatchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ inProgress: progress }] },
    });
  };

  public createMatches = async (newMatch: IMatch): Promise<ICreated | IError> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;
    const homeCheck = await MatchesModel.findOne({ where: { homeTeamId } });
    const awayCheck = await MatchesModel.findOne({ where: { awayTeamId } });

    if (!awayCheck || !homeCheck) {
      return { status: 404, response: 'There is no team with such id!' };
    }

    const data = await MatchesModel.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    return data;
  };

  public patchMatches = async (id: number, newInfo: IInfo) => {
    MatchesModel.update(
      {
        homeTeamGoals: newInfo.homeTeamGoals,
        awayTeamGoals: newInfo.awayTeamGoals,
      },
      {
        where: { id } },
    );
  };

  public patchProgressMatches = async (id: number) =>
    MatchesModel.update({ inProgress: false }, { where: { id } });
}

export default MatchesService;
