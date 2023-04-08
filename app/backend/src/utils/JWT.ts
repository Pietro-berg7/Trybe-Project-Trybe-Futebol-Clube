import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || '';

const generateToken = (data: IUser) => jwt
  .sign(data, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });

const validateToken = (token: string) => jwt.verify(token, JWT_SECRET);

export { generateToken, validateToken };
