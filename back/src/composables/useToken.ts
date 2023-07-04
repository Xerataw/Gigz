import useUtils from './useUtils';
import jwt from 'jsonwebtoken';
import z from 'zod';

const { getEnv } = useUtils();

const SALT = getEnv('TOKEN_SALT');

const PayloadSchema = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
});

type TokenPayload = z.infer<typeof PayloadSchema>;

/**
 * Parse the given token and return the data associated with it.
 * Returns null if the token was invalid.
 */
const parseToken = (token: string): TokenPayload | null => {
  try {
    const decodedToken = jwt.verify(token, SALT);
    const account = PayloadSchema.safeParse(decodedToken);

    if (!account.success) return null;

    return account.data;
  } catch (e) {
    return null;
  }
};

const TOKEN_OPTS = {
  expiresIn: '1w',
};

/**
 * Return a token generated using the given payload.
 */
const generateToken = (payload: TokenPayload) =>
  jwt.sign(payload, SALT, TOKEN_OPTS);

const useToken = () => ({
  parseToken,
  generateToken,
});

export default useToken;
