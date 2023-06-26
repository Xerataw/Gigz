import bcrypt from 'bcrypt';

import useUtils from './useUtils';

const { getEnv } = useUtils();

const ROUNDS = Number(getEnv('SALT_ROUNDS'));

const hash = (password: string) => {
  return bcrypt.hash(password, ROUNDS);
};

const compare = async (passwordGiven: string, hash: string) => {
  return await bcrypt.compare(passwordGiven, hash);
};

const useHash = () => ({
  hash,
  compare,
});

export default useHash;
