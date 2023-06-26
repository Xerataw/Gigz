/**
 * Enumeration containing all API messages return to the front-end.
 */
enum ApiMessages {
  MissingToken = 'MISSING_TOKEN',
  WrongToken = 'WRONG_TOKEN',

  ApiRunning = 'API_RUNNING',
}

/**
 * Return the specified environment varibale or throw an error if it is not set.
 */
const getEnv = (name: string) => {
  const variable = process.env[name];

  if (variable === undefined || variable === null)
    throw Error(`${name} environment variable not set!`);

  return variable;
};

const useUtils = () => ({
  ApiMessages,

  getEnv,
});

export default useUtils;
