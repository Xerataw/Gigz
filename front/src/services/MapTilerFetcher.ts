import axios from 'axios';

const envVars = import.meta.env;

export interface IAddressSearchItem {
  value: string;
  address_fr: string;
  longitude: number;
  latitude: number;
}

export default class MapTiler {
  private static API_KEY = envVars.VITE_MAPTILER_API_KEY;

  static getAutocomplete = (
    searchLocation: string,
    handleSearchResult: (searchItems: IAddressSearchItem[]) => void
  ) => {
    if (searchLocation.length > 0) {
      axios
        .get(
          `https://api.maptiler.com/geocoding/${searchLocation}.json?key=${this.API_KEY}`
        )
        .then((res) => res.data.features)
        .then((res) =>
          res.filter((item: any) => item.place_type[0] === 'address')
        )
        .then((res) => {
          return res.map((item: any) => ({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
            address_fr: item.place_name,
            value: item.place_name,
            key:
              String(Number(item.geometry.coordinates[1])) +
              String(Number(item.geometry.coordinates[0])),
          }));
        })
        .then((res: IAddressSearchItem[]) => {
          handleSearchResult(res);
        });
    }
  };
}
