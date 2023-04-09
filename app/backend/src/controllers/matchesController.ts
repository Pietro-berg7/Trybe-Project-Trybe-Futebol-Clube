import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

export default class MatchesController {
  private _matchesService = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await this._matchesService.getAllMatches();

      res.status(200).json(matches);
    }

    const filtered = await this._matchesService.getMatchesByProgress(inProgress as string);

    res.status(200).json(filtered);
  }
}
