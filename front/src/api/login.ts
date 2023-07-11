import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';

export const login = async (
  _email: string,
  _password: string
): Promise<IGigzResponse<any>> => {
  return GigzFetcher.post(
    'login',
    { email: _email, password: _password },
    {},
    false
  );
};

export default login;
