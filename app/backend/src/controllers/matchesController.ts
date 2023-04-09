import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  private _matchesService = new MatchesService();

  public getAllMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await this._matchesService.getAllMatches();

      res.status(200).json(matches);
    }

    const matches = await this._matchesService.getMatchesByProgress(inProgress as string);

    res.status(200).json(matches);
  };

  public createMatches = async (req: Request, res: Response): Promise<void> => {
    const newMatch = req.body;

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      res.status(422).json({
        response: 'It is not possible to create a match with two equal teams',
      });
    }

    const createdMatch = await this._matchesService.createMatches(newMatch);

    if (createdMatch.response) {
      res.status(404).json({ response: createdMatch.response });
    }

    res.status(201).json(createdMatch);
  };

  public patchMatches = async (req: Request, res: Response): Promise<void> => {
    const newInfo = req.body;
    const { id } = req.params;

    await this._matchesService.patchMatches(Number(id), newInfo);

    res.status(200).json({ message: 'Updated' });
  };

  public patchProgressMatches = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await this._matchesService.patchProgressMatches(Number(id));

    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
