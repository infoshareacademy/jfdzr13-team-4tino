import React from "react";
import styles from "./Introduction.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <div className={styles.hero}>
        <h1 className={styles.entryTitle}>
          Twój prezent dla bliskich i dla przyszłości!
        </h1>
        <p className={styles.entry}>
          Podaruj wyjątkowy prezent, który ma znaczenie - zasadź drzewo w jednym
          z dostępnych miejsc, wybierz spośród pięciu różnych gatunków drzew i
          spersonalizuj tabliczkę z dedykacją. Każde drzewo to nowe życie, które
          pomaga w walce ze zmianami klimatu. Pomóż nam poprawiać jakość
          powietrza i stworzyć nowy wspaniały zielony zakątek. Wybierz
          lokalizację i zobacz, jak Twoje drzewo rośnie i przynosi korzyści dla
          wszystkich! Twój prezent to więcej niż drzewo - to przyszłość dla nas
          wszystkich!
        </p>
        <Link to="/order">
          <button>Chcę zasadzić swoje drzewo!</button>
        </Link>
      </div>

      <div className={styles.map}>
        <MapContainer
          center={[52, 19]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[53.5, 17.5]}>
            <Popup>Nadleśnictwo 1</Popup>
          </Marker>
          <Marker position={[51.5, 19.0]}>
            <Popup>Nadleśnictwo 2</Popup>
          </Marker>
          <Marker position={[52.7, 21.2]}>
            <Popup>Nadleśnictwo 3</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Introduction;
