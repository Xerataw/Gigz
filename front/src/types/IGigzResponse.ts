import { HttpStatusCode } from 'axios';

export default interface IGigzResponse<T> {
  ok: boolean;
  code: HttpStatusCode;
  message?: string;
  data?: T;
}
