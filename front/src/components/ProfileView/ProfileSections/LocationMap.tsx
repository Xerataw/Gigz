import { LeafletEvent, LeafletEventHandlerFn } from 'leaflet';
import { GeoApiFrProvider, GeoSearchControl } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import ProfileSection from './ProfileSection';
import './locationSearchField.css';

interface ILocationProps {
  longitude: number;
  latitude: number;
  isEditMode?: boolean;
  searchOnlyCity?: boolean;
}

interface ILocationSearchProps {
  onLocationSelect: LeafletEventHandlerFn;
  searchOnlyCity?: boolean;
}

const LocationMap: React.FC<ILocationProps> = ({
  longitude,
  latitude,
  isEditMode = false,
  searchOnlyCity = false,
}) => {
  const { setAddress, setCity, setCityCode, setLongitude, setLatitude } =
    useProfileEdit();
  const { t } = useTranslation();

  const onLocationSelect = (address: LeafletEvent) => {
    // @ts-ignore
    setAddress(address?.location?.label);
    // @ts-ignore
    setCity(address?.location?.raw?.properties?.name);
    // @ts-ignore
    setCityCode(address?.location?.raw?.properties?.citycode);
    // @ts-ignore
    setLongitude(address?.location?.x);
    // @ts-ignore
    setLatitude(address?.location?.y);
  };

  return (
    <ProfileSection name={t('profile.locationMap.title')}>
      <MapContainer
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        scrollWheelZoom={false}
        touchZoom={true}
        className="h-[15.625rem] w-full ml-0 rounded-xl"
      >
        {isEditMode && (
          <LocationSearchField
            onLocationSelect={onLocationSelect}
            searchOnlyCity={searchOnlyCity}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: latitude, lng: longitude }}></Marker>
      </MapContainer>
    </ProfileSection>
  );
};

const LocationSearchField: React.FC<ILocationSearchProps> = ({
  onLocationSelect,
  searchOnlyCity = false,
}) => {
  const provider = new GeoApiFrProvider({
    params: {
      type: searchOnlyCity ? 'municipality' : '', // limit search results to city
    },
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    keepResult: true,
  });

  const map = useMap();
  map.on('geosearch/showlocation', onLocationSelect);

  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default LocationMap;
