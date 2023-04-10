import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';

export default class MatchesService {
  public getAllMatches = async () => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!matches) return { status: 404, response: 'Matches not found' };
    return { status: 200, response: matches };
  };

  public getMatchesByProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return { status: 200, response: matches };
  };
}
