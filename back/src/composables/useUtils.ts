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
  getEnv,
});

export default useUtils;
