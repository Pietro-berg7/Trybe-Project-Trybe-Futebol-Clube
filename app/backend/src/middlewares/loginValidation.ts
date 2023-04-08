import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }

  if (!email.match(regex) || !email) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  if (password.length < 6 || !password) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  next();
};

export default loginValidation;
