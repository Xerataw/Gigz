import { HttpStatusCode } from 'axios';

type GigzResponse<T> = {
  ok: boolean;
  code: HttpStatusCode;
  message?: string;
  data?: T;
};

export default GigzResponse;
