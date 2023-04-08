import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.post('/', loginValidation, (req, res) => loginController.postLogin(req, res));

export default router;
