import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const Map = () => {
  const [locations] = useState([
    {
      coordinates: [53.5, 17.5],
      radius: 10000,
      fillColor: "#f03",
      fillOpacity: 0.5,
      name: "Nadleśnictwo 1",
    },
    {
      coordinates: [51.5, 19.0],
      radius: 10000,
      fillColor: "#30f",
      fillOpacity: 0.5,
      name: "Nadleśnictwo 2",
    },
    {
      coordinates: [52.7, 21.2],
      radius: 10000,
      fillColor: "#3f0",
      fillOpacity: 0.5,
      name: "Nadleśnictwo 3",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleButtonClick = (name) => {
    setSelectedLocation(name);
  };

  return (
    <div className={styles.mapContainer}>
      <h2>Gdzie chcesz posadzić swoje drzewo</h2>
      <MapContainer
        center={[52.5, 19.1]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "800px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Circle
            key={index}
            center={location.coordinates}
            radius={location.radius}
            color={location.color}
            fillColor={location.fillColor}
            fillOpacity={location.fillOpacity}
          >
            <Popup className={styles.customPopup}>
              <h5>{location.name}</h5>
              <br />
              <button onClick={() => handleButtonClick(location.name)}>
                Wybierz nadleśnictwo
              </button>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      <div className={styles.capturedLocation}>
        <h4>Wybrane nadleśnictwo:</h4>{" "}
        {selectedLocation || "Wybierz lokalizację"}
      </div>
    </div>
  );
};

export default Map;
