import IonicStorageAccessor from '../../services/IonicStorageAccessor';

/**
 * This decorator is used to store the user in the local storage on change.
 */
export const storeUser = (argument: string) => {
  return (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      this[argument] = args[0];
      IonicStorageAccessor.set('user', this);
      return originalMethod.apply(target, args);
    };

    return descriptor;
  };
};
