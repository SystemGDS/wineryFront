/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./Carousel.module.css";

export default function Carousel() {
  const images = [
    "https://images.unsplash.com/photo-1541971897566-308cf7ad0934?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    "https://images.unsplash.com/photo-1529060532150-a0c935a6d6e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];
  const [img, setImg] = useState(0);

  function next() {
    if (img < images.length - 1) setImg(img + 1);
    else setImg(0);
  }

  function back() {
    if (img > 0) setImg(img - 1);
    else setImg(images.length - 1);
  }

  useEffect(() => {
    const time = setTimeout(next, 6000);
    return () => clearTimeout(time);
  }, [img]);

  return (
    <div>
      <div className={style.slideshowContainer}>
        <img
          key={img}
          src={images[img]}
          className={`${style.img} ${style.fade}`}
        />

        <a className={style.prev} onClick={back}>
          &#10094;
        </a>
        <a className={style.next} onClick={next}>
          &#10095;
        </a>
        <div className={style.dotContainer}>
          {images.length ? (
            images.map((e, k) => (
              <span
                key={k + 1}
                className={img !== k ? style.dot : style.activeDot}
                onClick={() => setImg(k)}
              ></span>
            ))
          ) : (
            <p>Image not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
