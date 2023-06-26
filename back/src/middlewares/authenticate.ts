import { NextFunction, Request, Response } from 'express';
import useDatabase from '../composables/useDatabase';

const { findAccountByToken } = useDatabase();

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers['authorization'];

  const token = bearer && bearer.split(' ')[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Unauthenticated.',
    });

  const account = await findAccountByToken(token);

  if (!account)
    return res.status(401).json({
      success: false,
      message: 'Unauthenticated.',
    });

  req.accountId = account.id;
  next();
};

export default authenticate;
