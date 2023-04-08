import { Request, Response } from 'express';

import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService = new LoginService();

  async postLogin(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._loginService.postLogin(req.body);

    res.status(status).json(response);
  }
}
