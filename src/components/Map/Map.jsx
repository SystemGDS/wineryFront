import React from "react";
import s from "./Map.module.css";
import MapInteractive from "./Mapinteractive.jsx";

export default function Map() {
  return (
    <div className={s.container}>
      <div className={s.text}>
        We are located at Uriarte 1870, Palermo - Buenos Aires, Argentina.
      </div>
      <MapInteractive />
      <div className={s.textInv}>Come visit us from 11.00am to 21:30pm!</div>
    </div>
  );
}
