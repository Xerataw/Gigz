import { HttpStatusCode } from 'axios';

type GigzResponse<T> = {
  code: HttpStatusCode;
  message?: string;
  data?: T;
};

export default GigzResponse;
