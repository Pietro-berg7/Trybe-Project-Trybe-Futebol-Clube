import { Request, Response } from 'express';

import TeamsService from '../services/teamsService';

export default class TeamsController {
  private _teamsService = new TeamsService();

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const { status, response } = await this._teamsService.getAllTeams();

    res.status(status).json(response);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, response } = await this._teamsService.getTeamById(Number(id));

    res.status(status).json(response);
  }
}
