import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import '../../../tailwind.css';
import styles from "./Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <div className={styles.hero}>
        <h1 className={styles.entryTitle}>
          Twój prezent dla bliskich i&nbsp;dla przyszłości!
        </h1>
        <p className={styles.entry}>
          Podaruj wyjątkowy prezent, który ma znaczenie - zasadź drzewo w&nbsp;jednym
          z&nbsp;dostępnych miejsc, wybierz spośród pięciu różnych gatunków drzew i&nbsp;spersonalizuj tabliczkę z&nbsp;dedykacją. Każde drzewo to nowe życie, które
          pomaga w&nbsp;walce ze zmianami klimatu. Pomóż nam poprawiać jakość
          powietrza i&nbsp;stworzyć nowy wspaniały zielony zakątek. Wybierz
          lokalizację i&nbsp;zobacz, jak Twoje drzewo rośnie i&nbsp;przynosi korzyści dla
          wszystkich! Twój prezent to więcej niż drzewo - to przyszłość dla nas
          wszystkich!
        </p>
        <div className={styles.button}>
        <Link to="/order">
          <TERipple rippleColor="light">
            <button
              type="button"
              className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10"
            >
              Chcę zasadzić swoje drzewo!
            </button>
          </TERipple>
        </Link>
        </div>
        
        
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
