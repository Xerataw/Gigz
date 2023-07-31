import axios from 'axios';

const envVars = import.meta.env;

export interface IAddressSearchItem {
  value: string;
  longitude: number;
  latitude: number;
  code: number;
  city: string;
}

export default class MapTiler {
  private static API_KEY = envVars.VITE_MAPTILER_API_KEY;

  static getAutocomplete = (
    type: string,
    searchLocation: string,
    handleSearchResult: (searchItems: IAddressSearchItem[]) => void
  ) => {
    if (searchLocation.length > 0) {
      axios
        .get(
          `https://api.maptiler.com/geocoding/${searchLocation}.json?key=${this.API_KEY}&country=fr&types=${type}`
        )
        .then((res) => res.data.features)
        .then((res) => {
          return res.map((item: any) => ({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
            value: item.place_name,
            city: item.context.find((contextItem) =>
              contextItem.id.includes('municipality')
            ).text,
            code: item.context[0].text,
          }));
        })
        .then((res: IAddressSearchItem[]) => {
          handleSearchResult(res);
        });
    }
  };
}
