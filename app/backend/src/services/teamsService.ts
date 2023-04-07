import TeamsModel from '../database/models/teamsModel';

export default class TeamsService {
  public getAllTeams = async () => {
    const teams = await TeamsModel.findAll();

    return { status: 200, response: teams };
  };

  public getTeamById = async (id: number) => {
    const team = await TeamsModel.findOne({ where: { id } });

    return { status: 200, response: team };
  };
}
