import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import style from "./CarouselOfferts.module.css";

const ofertas = [
  {
    id: 55,
    name: "Estiba Reservada 1994",
    winery: "Catena Zapata",
    origin: "Argentina - Agrelo",
    detail:
      "The Estiba Reservada 1994 is a Red wine produced in Argentina - Agrelo. It originates from the renowned winery Catena Zapata, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/Yt464jw0QS-ugF7ZQEbE2Q_pb_x300.png",
    category: "Red Wine",
    stock: 4,
    price: 44,
    idReviews: [],
    banned: false,
  },
  {
    id: 56,
    name: "Almaviva 2010",
    winery: "Almaviva",
    origin: "Chile - Puente Alto",
    detail:
      "The Almaviva 2010 is a Rose wine produced in Chile - Puente Alto. It originates from the renowned winery Almaviva, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/VACKmZQ1RvemXT9ViEPFnQ_pb_x300.png",
    category: "Rose Wine",
    stock: 1134,
    price: 3464,
    idReviews: [],
    banned: false,
  },
  {
    id: 57,
    name: "Cobos Volturno 2013",
    winery: "Viña Cobos",
    origin: "Argentina - Perdriel",
    detail:
      "The Cobos Volturno 2013 is a Red wine produced in Argentina - Perdriel. It originates from the renowned winery Viña Cobos, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/D1Mf1fYnRnageFjtfLXdFg_pb_x300.png",
    category: "Red Wine",
    stock: 233,
    price: 540,
    idReviews: [],
    banned: false,
  },
  {
    id: 58,
    name: "Red 2010",
    winery: "Nosotros",
    origin: "Argentina - Agrelo",
    detail:
      "The Red 2010 is a Sparkling wine produced in Argentina - Agrelo. It originates from the renowned winery Nosotros, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/VxGqxhU0TqWmUqByG5gZiw_pb_x300.png",
    category: "Red Wine",
    stock: 95,
    price: 968,
    idReviews: [],
    banned: false,
  },
  {
    id: 75,
    name: "Gran Blanco 2017",
    winery: "Henry Winery",
    origin: "Perú",
    detail:
      "The Cobos Volturno 2010 is a Red wine produced in Argentina - Perdriel. It originates from the renowned winery Viña Cobos, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/D1Mf1fYnRnageFjtfLXdFg_pb_x300.png",
    category: "Red Wine",
    stock: 85,
    price: 431,
    idReviews: [],
    banned: false,
  },
  {
    id: 59,
    name: "Malbec Argentino 2003",
    winery: "Catena Zapata",
    origin: "Argentina - Mendoza",
    detail:
      "The Malbec Argentino 2003 is a White wine produced in Argentina - Mendoza. It originates from the renowned winery Catena Zapata, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/K2Ui4ULxQd2S3jcrgwmxYQ_pb_x300.png",
    category: "White Wine",
    stock: 13,
    price: 43,
    idReviews: [],
    banned: false,
  },
  {
    id: 8,
    name: "Hurlo 2009",
    winery: "Garbole",
    origin: "Italy - Veneto",
    detail:
      "The Hurlo 2009 is a Red wine produced in Italy - Veneto. It originates from the renowned winery Garbole, known for its dedication and expertise in crafting quality wines.",
    image:
      "https://images.vivino.com/thumbs/f_G1SS0eT_C6hZGGwdEZqA_pb_x300.png",
    category: "Red Wine",
    stock: 26,
    price: 55,
    idReviews: [],
    banned: false,
  },
];

function CarrouselOfertas() {
  return (
    <div className="m-6">
      <div className={style.flexContainer}>
        <h2 className={style.our}>Our </h2>
        <h2 className={style.topwines}>Top Wines</h2>
      </div>
      <div className={style.reel}>
        <Swiper
          speed={2000}
          freeMode={true}
          grabCursor={true}
          modules={[Autoplay, Keyboard]}
          autoplay={{
            delay: 3000,
          }}
          keyboard={{
            enabled: true,
          }}
          className="m-3 "
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 30,
              centeredSlides: true,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 15,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {ofertas.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/detail/${item.id}`} key={item.id}>
                <div className={style.card}>
                  <h1 className={style.name}>{item.name}</h1>
                  <div className={style.cardtop}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={style.cardbottom}>
                    <h3>{item.origin}</h3>
                  </div>
                  <div className={style.category}>
                    <h4>{item.category}</h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CarrouselOfertas;
