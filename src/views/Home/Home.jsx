import React from "react";
import Map from "../../components/Map/Map";
import Carousel from "./Carousel.jsx";
import s from "./Home.module.css";
import CarouselOfertas from "./CarouselOfertas.jsx";

export default function Home() {
  return (
    <div className={s.mainHome}>
      <div>
        <Carousel />
      </div>
      <div>
        <CarouselOfertas />
      </div>
      <div className={s.map}>
        <Map />
      </div>
    </div>
  );
}
