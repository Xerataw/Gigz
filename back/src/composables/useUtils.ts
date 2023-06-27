import { Response } from 'express';

/**
 * Enumeration containing all API messages return to the front-end.
 */
enum ApiMessages {
  // Auth
  EmailTaken = 'EMAIL_TAKEN',
  MissingToken = 'MISSING_TOKEN',
  WrongToken = 'WRONG_TOKEN',
  WrongCredentials = 'WRONG_CREDENTIALS',

  BadRequest = 'BAD_REQUEST',

  ApiRunning = 'API_RUNNING',

  WrongRoute = 'WRONG_ROUTE',
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

const useUtils = () => ({
  ApiMessages,

  getEnv,
  sendError,
  sendResponse,
});

export default useUtils;
