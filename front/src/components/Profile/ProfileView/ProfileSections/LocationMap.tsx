// Sub components
import ProfileSection from './ProfileSection';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface ILocationProps {
  longitude: number;
  latitude: number;
}

const LocationMap: React.FC<ILocationProps> = ({ longitude, latitude }) => {
  return (
    <ProfileSection name="Localisation">
      <MapContainer
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        scrollWheelZoom={false}
        touchZoom={true}
        className="h-[250px] w-full ml-0 rounded-xl"
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
