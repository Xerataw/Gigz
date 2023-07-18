import { PrismaClient } from '@prisma/client';
import useToken from './useToken';

const { parseToken } = useToken();

/**
 * Prisma database client.
 */
const database = new PrismaClient();

/**
 * Return the account from the database matching the given id, if any.
 */
const findAccountById = async (id: number) => {
  return await database.account.findUnique({
    where: { id },
  });
};

/**
 * Return the account from the database corresponding to the given token.
 * If not account is found or if the token is invalid, return null.
 */
const findAccountByToken = async (token: string) => {
  const payload = parseToken(token);

  if (!payload) return null;

  const account = await await database.account.findUnique({
    where: { id: payload.id },
    include: {
      artist: true,
      host: true,
    },
  });
  if (!account || account.email !== payload.email) return null;

  return account;
};

/**
 * Return the account from the database corresponding to the given email, if
 * any.
 */
const findAccountByEmail = async (email: string) => {
  return await database.account.findUnique({
    where: { email },
    include: {
      host: true,
      artist: true,
      profile_pictures: true,
    },
  });
};

/**
 * Return the profiles from the database corresponding to the given account id.
 */
const findProfilesById = async (id: number) => {
  return await database.account.findUnique({
    where: { id },
    include: { host: true, artist: true },
  });
};

const useDatabase = () => ({
  database,

  findAccountById,
  findAccountByToken,
  findAccountByEmail,
  findProfilesById,
});

export default useDatabase;
