import { Response } from 'express';

/**
 * Enumeration containing all API messages return to the front-end.
 */
enum ApiMessages {
  // Auth
  EmailTaken = 'EMAIL_TAKEN',
  PhoneNumberTaken = 'PHONE_NUMBER_TAKEN',

  MissingToken = 'MISSING_TOKEN',
  WrongToken = 'WRONG_TOKEN',
  WrongCredentials = 'WRONG_CREDENTIALS',

  BadRequest = 'BAD_REQUEST',

  ApiRunning = 'API_RUNNING',

  WrongRoute = 'WRONG_ROUTE',

  ServerError = 'SERVER_ERROR',
  NotFound = 'NOT_FOUND',
}

/**
 * Return the specified environment varibale or throw an error if it is not
 * set.
 */
const getEnv = (name: string) => {
  const variable = process.env[name];

  if (variable === undefined || variable === null)
    throw Error(`${name} environment variable not set!`);

  return variable;
};

/**
 * Send a formatted error response to the client with the given error message
 * and a specific status code (default: 400 BAD REQUEST).
 */
const sendError = (
  response: Response,
  message: ApiMessages,
  statusCode = 400
) => {
  response.status(statusCode).json({
    success: false,
    message: message,
  });
};

/**
 * Send a formatted success response to the client with the given data  and a
 * specific status code (default: 200 OK).
 */
const sendResponse = (response: Response, data: any, statusCode = 200) => {
  response.status(statusCode).json({
    success: true,
    data: data,
  });
};

const fromDbFormat = (body: Array<unknown> | object): any => {
  return transformBody(body, 'fromDB');
};

const toDbFormat = (body: Array<unknown> | object): any => {
  return transformBody(body, 'toDB');
};

/**
 * Tranform recursively all the keyx of an array or an object into a selected case typing.
 * fromDB transform a snakeCase strng into a camelCase string.
 * toDB transform a camelCase strng into a snakeCase string.
 */
const transformBody = (body: Array<unknown> | object | any, transform: string): any => {
  if (Array.isArray(body)) {
    return body.map(item => transformBody(item, transform));
  }

  if (typeof body === 'object' && body !== null) {
    const convertedBody: any = Array.isArray(body) ? [] : {};

    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        let convertedKey = '';
        if (transform === 'fromDB') {
          convertedKey = toCamelCase(key);
        } else {
          convertedKey = toSnakeCase(key);
        }

        if (typeof body[key] === 'object' && body[key] !== null) {
          convertedBody[convertedKey] = transformBody(body[key], transform);
        } else {
          convertedBody[convertedKey] = body[key];
        }
      }
    }

    return convertedBody;
  }

  return body;
};

/**
 * Convert a camelCase string into a snakeCase string
 */
const toSnakeCase = (key: string): string => {
  return key.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase());
};

/**
 * Convert a snakeCase string into a camelCase string
 */
const toCamelCase = (key: string): string => {
  return key.replace(/_([a-z])/g, (_, match) =>
    match.toUpperCase()
  );
};

const useUtils = () => ({
  ApiMessages,

  getEnv,
  sendError,
  sendResponse,
  toDbFormat,
  fromDbFormat,
});

export default useUtils;
