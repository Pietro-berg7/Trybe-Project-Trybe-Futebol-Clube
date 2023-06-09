import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getAllLeaderboardHome(req, res));
router.get('/away', (req, res) => leaderboardController.getAllLeaderboardAway(req, res));

export default router;
