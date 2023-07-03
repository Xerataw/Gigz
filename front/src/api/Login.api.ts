import GigzFetcher from '../services/GigzFetcher';
import GigzResponse from '../types/GigzResponse';

export const login = async (
  _email: string,
  _password: string
): Promise<GigzResponse<any>> => {
  return GigzFetcher.post(
    'login',
    { email: _email, password: _password },
    {},
    false
  );
};

export default login;
