import { Request, Response } from 'express';

import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService = new LoginService();

  async postLogin(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._loginService.postLogin(req.body);

    res.status(status).json(response);
  }

  public getRoleByToken = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { role } = req.body.userToken;
    const { status, response } = await this._loginService.getRoleByToken(authorization, role);

    res.status(status).json(response);
  };
}
