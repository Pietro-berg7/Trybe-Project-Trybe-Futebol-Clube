import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

export default class MatchesController {
  private _matchesService = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const { status, response } = await this._matchesService.getAllMatches();

      res.status(status).json(response);
    }

    const booleanInProgress = JSON.parse(inProgress as string);
    const { status, response } = await this._matchesService.getMatchesByProgress(booleanInProgress);

    res.status(status).json(response);
  }
}