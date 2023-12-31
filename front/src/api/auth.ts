import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';
import ILoginUser from '../types/ILoginUser';

export const login = async (
  _email: string,
  _password: string
): Promise<IGigzResponse<ILoginUser>> => {
  return GigzFetcher.post<ILoginUser>(
    'login',
    { email: _email, password: _password },
    {},
    false
  );
};

export const register = async (values: any): Promise<IGigzResponse<any>> => {
  return GigzFetcher.post<{ [key: string]: string }>(
    'register',
    {
      email: values.email,
      password: values.password,
      profileType: values.userType,
      phoneNumber: '+33' + values.phone,
    },
    {},
    false
  );
};
