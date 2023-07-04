declare namespace Express {
  export interface Request {
    account: {
      id: number;
      profileType: 'artist' | 'host';
    };
  }
}
