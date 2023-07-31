export class LinkUtils {
  static linkRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  static isLink = (value: string): boolean => {
    return this.linkRegex.test(value);
  };

  static isLinkIncluding = (value: string, includeTag: string) => {
    return (
      (this.isLink(value) && value.includes(includeTag)) || value.length === 0
    );
  };

  static validateLink = (
    value: string,
    includeTag: string,
    errorLabel: string
  ): string | null => {
    if (this.isLinkIncluding(value, includeTag) === true) return null;
    else return 'Veuillez inclure un lien ' + errorLabel + '.';
  };

  static concatenateURL = (pathname: string, ...uris: string[]) => {
    const uris_ = uris.map((uri) =>
      uri.replace(/^[/]*/, '').replace(/[/]*$/, '')
    );
    const pathname_ = pathname.replace(/[/]*$/, '');

    let finalURL = pathname_;

    for (const uri of uris_) {
      finalURL += '/' + uri;
    }

    return finalURL;
  };
}
