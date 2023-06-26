/**
 * Enumeration containing all error messages return to the front-end.
 */
enum ErrorMessages {
  MissingToken = 'MISSING_TOKEN',
  WrongToken = 'WRONG_TOKEN',
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
  ErrorMessages,

  getEnv,
});

export default useUtils;
