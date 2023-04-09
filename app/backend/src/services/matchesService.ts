import { Op } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';

export default class MatchesService {
  public getAllMatches = async () => Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  public getMatchesByProgress = async (inProgress: string) => {
    const boolean = inProgress === 'true';
    Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ boolean }] },
    });
  };
}
