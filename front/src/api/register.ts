import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';

export const register = async (values: any): Promise<IGigzResponse<any>> => {
  return GigzFetcher.post<{ [key: string]: string }>('register', {
    email: values.email,
    password: values.password,
    profileType: values.userType,
    phoneNumber: '+33' + values.phone,
  });
};

export default register;
