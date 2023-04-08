import { Router } from 'express';
import { loginValidation, tokenValidation } from '../middlewares/loginValidation';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.post('/', loginValidation, (req, res) => loginController.postLogin(req, res));
router.get('/role', tokenValidation, (req, res) => loginController.getRoleByToken(req, res));

export default router;
