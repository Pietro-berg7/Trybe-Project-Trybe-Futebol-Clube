import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.get('/', (req, res) => matchesController.getMatchesByProgress(req, res));

export default router;
