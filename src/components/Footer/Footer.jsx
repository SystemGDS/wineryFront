import React from "react";
import { Link } from "react-router-dom";
import s from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className={s.container}>
      <footer>
        <h1 className={s.followus}>Connect with us</h1>
        <div className={s.logos}>
          <Link to={"https://twitter.com/home"} target="_blank">
            <FontAwesomeIcon className={s.iconred} icon={faTwitter} />
          </Link>

          <Link to={"https://www.facebook.com/"} target="_blank">
            <FontAwesomeIcon className={s.iconred} icon={faFacebook} />
          </Link>

          <Link to={"https://www.instagram.com/"} target="_blank">
            <FontAwesomeIcon className={s.iconred} icon={faInstagram} />
          </Link>

          <Link to={"https://web.whatsapp.com/"} target="_blank">
            <FontAwesomeIcon className={s.iconred} icon={faWhatsapp} />
          </Link>
        </div>
        <p className={s.copyright}> Henry Winery | Copyright © 2023</p>
      </footer>
    </div>
  );
}
