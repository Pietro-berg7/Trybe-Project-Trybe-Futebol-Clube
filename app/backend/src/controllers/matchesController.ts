import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

export default class MatchesController {
  private _matchesService = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const boolean = JSON.parse(inProgress as string);
      const { status, response } = await this._matchesService.getMatchesByProgress(boolean);

      return res.status(status).json(response);
    }

    const { status, response } = await this._matchesService.getAllMatches();

    if (status !== 200) {
      return res.status(status).json({ message: 'Matches not found' });
    }

    return res.status(status).json(response);
  }
}
