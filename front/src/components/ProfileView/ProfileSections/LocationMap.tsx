import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import ProfileSection from './ProfileSection';

interface ILocationProps {
  longitude: number;
  latitude: number;
}

const LocationMap: React.FC<ILocationProps> = ({ longitude, latitude }) => {
  const { t } = useTranslation();

  return (
    <ProfileSection name={t('profile.locationMap.title')}>
      <MapContainer
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        scrollWheelZoom={false}
        touchZoom={true}
        className="h-[15.625rem] w-full ml-0 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: latitude, lng: longitude }}></Marker>
      </MapContainer>
    </ProfileSection>
  );
};

export default LocationMap;
