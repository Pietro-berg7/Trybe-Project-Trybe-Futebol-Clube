import { Router } from 'express';
import { tokenValidation } from '../middlewares/loginValidation';
import MatchesController from '../controllers/matchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.post('/', tokenValidation, (req, res) => matchesController.createMatches(req, res));
router.patch('/:id', tokenValidation, (req, res) => matchesController.patchMatches(req, res));
router.patch(
  '/:id/finish',
  tokenValidation,
  (req, res) => matchesController.patchProgressMatches(req, res),
);

export default router;
