export class DevToolsLogic {
  private static caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  public static getRandomString = (length?: number) => {
    let result = '';
    const len = length ?? Math.floor(Math.random() * 20);

    for (let i = 0; i < len; i++) {
      result += this.caracteres.charAt(
        Math.floor(Math.random() * this.caracteres.length)
      );
    }

    return result;
  };

  public static getRandomNumber = (length?: number) => {
    const max = Math.pow(10, length ?? 6);
    return Math.floor(Math.random() * max);
  };

  public static getRandomEmail = () => {
    return (
      this.getRandomString() +
      '@' +
      this.getRandomString() +
      '.' +
      this.getRandomString(4)
    );
  };

  public static getRandomPhone = () => {
    let phoneNumber = '6';

    for (let i = 0; i < 8; i++) {
      phoneNumber += Math.floor(Math.random() * 10);
    }

    return phoneNumber;
  };

  public static getRandomPassword = () => {
    return (
      this.getRandomString(5).toLowerCase() +
      this.getRandomString(5).toUpperCase() +
      this.getRandomNumber(5).toString()
    );
  };
}
