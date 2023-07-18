import { NextFunction, Request, Response } from 'express';
import useDatabase from '../composables/useDatabase';
import useUtils from '../composables/useUtils';

const { ApiMessages } = useUtils();
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
      message: ApiMessages.MissingToken,
    });

  const account = await findAccountByToken(token);

  const profile = account?.artist || account?.host;

  if (!account)
    return res.status(401).json({
      success: false,
      message: ApiMessages.WrongToken,
    });

  req.account = {
    id: account.id,
    profileType: account.profile_type,
    longitude: profile?.longitude,
    latitude: profile?.latitude,
  };

  next();
};

export default authenticate;
