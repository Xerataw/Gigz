declare namespace Express {
  export interface Request {
    account: {
      id: number;
      profileType: 'artist' | 'host';
      longitude: number | null;
      latitude: number | null;
    };
  }
}
