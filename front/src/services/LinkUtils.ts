export class LinkUtils {
  static linkRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  static isLink = (value: string): boolean => {
    return this.linkRegex.test(value);
  };

  static isLinkIncluding = (value: string, includeTag: string) => {
    return this.isLink(value) && value.includes(includeTag);
  };

  static validateLink = (
    value: string,
    includeTag: string,
    errorLabel: string
  ): string | null => {
    if (this.isLinkIncluding(value, includeTag) === true) return null;
    else return 'Veuillez inclure un lien ' + errorLabel + '.';
  };
}
