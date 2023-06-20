import styles from "./About.module.css";
import vino1 from "../About/img/vino1.jpg";
import vino2 from "../About/img/vino2.jpg";
import vinoteca from "../About/img/vino3.jpg";

export default function About() {
  return (
    <div className={styles.colores}>
      <section className={styles.headercontainer}>
        <div className={styles.sideleft}>
          <h1 className={styles.up}>Nice to meet you!</h1>
          <p>
            Enjoy our products and travel with the palate to any part of the
            planet, in each section of the page you will find details of the
            products that interest you as well as ease in obtaining them. .
          </p>
        </div>
        <div className={styles.sideright}>
          <img src={vino1} alt="wine" />
        </div>
        <img className={styles.imagen} src={vino2} alt="girl" />

        <div className={styles.text}>
          <h1 className={styles.up2}>Our Objetive</h1>
          <p>
            We are a company with a belief which is that it is not necessary to
            be in a place to know it if you can travel with only a sip of our
            products..
          </p>
        </div>
      </section>
      <img className={styles.imagen2} src={vinoteca} alt="girl" />
    </div>
  );
}
