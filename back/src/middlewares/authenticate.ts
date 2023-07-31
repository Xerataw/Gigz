import { NextFunction, Request, Response } from 'express';
import useDatabase from '../composables/useDatabase';
import useUtils from '../composables/useUtils';

const { ApiMessages, sendError } = useUtils();
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

  if (!account) {
    return sendError(res, ApiMessages.WrongToken, 401);
  }

  if (account.email_validated === 0) {
    return sendError(res, ApiMessages.EmailNotValidated, 401);
  }

  req.account = {
    id: account.id,
    profileType: account.profile_type,
    longitude: profile ? profile.longitude : null,
    latitude: profile ? profile.latitude : null,
  };

  next();
};

export default authenticate;
