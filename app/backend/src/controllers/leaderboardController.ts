import { Request, Response } from 'express';

import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();

  async getAllLeaderboardHome(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._leaderboardService.getAllLeaderboard('homeTeamId');
    res.status(status).json(response);
  }
}
