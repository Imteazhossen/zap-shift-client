import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLoaderData } from 'react-router';

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Helper component to fly map to selected position
const FlyToMarker = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15); // zoom level when flying to marker
  }
  return null;
};

const Coverage = () => {
  const branches = useLoaderData();
  const [search, setSearch] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openPopupId, setOpenPopupId] = useState(null);

  const centerOfBangladesh = [23.6850, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const found = branches.find(branch =>
      branch.district.toLowerCase().includes(search.toLowerCase())
    );
    if (found) {
      setSelectedPosition([found.latitude, found.longitude]);
      setOpenPopupId(found.district);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="min-h-screen p-5 bg-base-100 text-base-content">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
        We are available in 64 districts
      </h2>

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md rounded-l-full"
        />
        <button type="submit" className="btn btn-primary text-black rounded-r-full">
          Search
        </button>
      </form>

      {/* 🗺️ Map */}
      <div className="max-w-6xl mx-auto h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={centerOfBangladesh} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fly to selected marker if exists */}
          <FlyToMarker position={selectedPosition} />

          {branches.map((branch, index) => (
            <Marker key={index} position={[branch.latitude, branch.longitude]}>
              <Popup autoOpen={branch.district === openPopupId}>
                <strong>{branch.district}</strong>
                <br />
                Covered Areas: {branch.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
