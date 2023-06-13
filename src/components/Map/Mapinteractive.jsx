/* eslint-disable no-unused-vars */
import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import s from "./Mapinteractive.module.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Wine from "./Img/Wine.jpg";
import L from "leaflet";

const MapInteractive = ({ positionDetail }) => {
  const MarkerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  const [mapCenter, setMapCenter] = useState(
    positionDetail ? positionDetail : [-34.585321, -58.429187] // Actualizar con las nuevas coordenadas
  );

  return (
    <div className={s.map_container}>
      <MapContainer className={s.map} center={mapCenter} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={mapCenter} icon={MarkerIcon}>
          <Popup position={mapCenter}>
            <div className={s.navlink}>
              <a
                href="https://www.google.com/maps/place/Gorriti+3710,+Palermo,+Buenos+Aires,+Argentina"
                target="_blank"
                rel="noreferrer"
              >
                <h3 className={s.title}>
                  <b>Henry Winery</b>
                </h3>
                <img className={s.pictureHome} src={Wine} alt="" />
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapInteractive;
