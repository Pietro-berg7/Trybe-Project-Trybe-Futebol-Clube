import { compare } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import Users from '../database/models/usersModel';
import { generateToken } from '../utils/JWT';

export default class LoginService {
  public postLogin = async (userData: ILogin) => {
    const { email } = userData;
    const user = await Users.findOne({ where: { email } });

    if (!user || !(await compare(userData.password, user.password))) {
      return { status: 401, response: { message: 'Invalid email or password' } };
    }

    const token = generateToken({
      id: user.id, username: user.username, role: user.role, email: user.email,
    });

    return { status: 200, response: { token } };
  };

  public getRoleByToken = async (token: string | undefined, role: string) => {
    if (!token) {
      return { status: 200, response: { message: 'Token not found' } };
    }
    return { status: 200, response: { role } };
  };
}
