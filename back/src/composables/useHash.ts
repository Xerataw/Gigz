import bcrypt from 'bcrypt';

import useUtils from './useUtils';

const { getEnv } = useUtils();

const hash = (password: string) => {
  return bcrypt.hash(password, getEnv('PASSWORD_SALT'));
};

const compare = async (passwordGiven: string, hash: string) => {
  return await bcrypt.compare(passwordGiven, hash);
};

const useHash = () => ({
  hash,
  compare,
});

export default useHash;
