import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ProfileSection from './ProfileSection';

export interface ILocationProps {
  longitude: number;
  latitude: number;
}

export default function LocationMap({ longitude, latitude }: ILocationProps) {
  return (
    <ProfileSection name="Localisation">
      <MapContainer
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        scrollWheelZoom={false}
        touchZoom={true}
        style={{ height: '250px', width: '100%', marginLeft: '0%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={{ lat: latitude, lng: longitude }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </ProfileSection>
  );
}
