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

  public createMatches = async (req: Request, res: Response): Promise<Response> => {
    const newMatch = req.body;

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const created = await this._matchesService
      .createMatches(newMatch);

    if (created.message) {
      return res.status(404).json({ message: created.message });
    }

    return res.status(201).json(created);
  };

  public updateMatches = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const newInfo = req.body;

    await this._matchesService
      .updateMatches(Number(id), newInfo);

    return res.status(200).json({ message: 'Updated' });
  };

  public finishMatches = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this._matchesService
      .finishMatches(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}
