import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import { TERipple } from "tw-elements-react";
import styles from "./Map.module.css";
import "./customLeafletStyles.css";

const Map = ({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setZoomLevel(6); // telefony
      } else if (width <= 1080) {
        setZoomLevel(7); // tablety
      } else {
        setZoomLevel(7); // kompy
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const locations = [
    {
      coordinates: [53.5, 17.5],
      radius: 10000,
      fillColor: "#f03",
      fillOpacity: 0.5,
      name: "Nadleśnictwo Płocicz",
    },
    {
      coordinates: [51.5, 19.0],
      radius: 10000,
      fillColor: "#30f",
      fillOpacity: 0.5,
      name: "Nadleśnictwo Stare Kozuby",
    },
    {
      coordinates: [52.7, 21.2],
      radius: 10000,
      fillColor: "#3f0",
      fillOpacity: 0.5,
      name: "Nadleśnictwo Bartodzieje",
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleButtonClick = (name) => {
    setSelectedLocation(name);
  };

  const handleConfirmLocation = () => {
    onSelectLocation(selectedLocation);
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);
    }
  }, [zoomLevel]);

  return (
    <div className={styles.mapContainer}>
      <h2>Gdzie chcesz posadzić swoje drzewo</h2>
      <div className={styles.map}>
        <MapContainer
          ref={mapRef}
          center={[52.8, 19.1]}
          zoom={zoomLevel}
          scrollWheelZoom={false}
          style={{ height: "600px", width: "100%" }}
          maxZoom={10} // Maksymalne zbliżenie
          minZoom={4} // Minimalne zbliżenie
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
              fillColor={location.fillColor}
              fillOpacity={location.fillOpacity}
            >
              <Popup className={styles.customPopup}>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    onClick={() => handleButtonClick(location.name)}
                    className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
                  >
                    Wybierz {location.name}
                  </button>
                </TERipple>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
      <div className={styles.confirm}>
        <div className={styles.capturedLocation}>
          <h4>Wybrane nadleśnictwo:</h4>
          {selectedLocation || "Wybierz lokalizację"}
        </div>
        <TERipple rippleColor="light">
          <button
            type="button"
            onClick={handleConfirmLocation}
            className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
          >
            Potwierdź lokalizację
          </button>
        </TERipple>
      </div>
    </div>
  );
};

export default Map;
