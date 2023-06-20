/*eslint-disable */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import style from "./WineDetail.module.css";
import axios from "axios";
import { WineDataProvider } from "../../utils/WineDataProvider";
import { sendToCart, addToCart } from "../../Redux/Actions/actionsIndex";
import { toast } from "react-toastify";
import { Reviews } from "@mui/icons-material";
import UserReview from "../../components/Reviews/ReviewComponent";

export default function WineDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [wineById, setWineById] = useState(null);
  const wines = useSelector((state) => state.wines);

  const cart = useSelector((state) => state.cart);

  async function detallesvino() {
    try {
      // http://localhost:3001
      const json = await axios.get(`/wines/${id}`);
      const wine = await json.data;

      setWineById(wine);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    detallesvino();
  }, []);

  //const handleClick = (e) => {
  //e.preventDefault();
  //const existe = cart.filter((e) => {
  //return (e?.id === wines.id)
  //})?.length > 0
  //if (existe) {
  //console.log("funciona");
  //return
  //}
  //dispatch(postProductCart(cart));

  //}

  const handleAddToCart = () => {
    const product = {
      id: wineById.id,
      name: wineById.name,
      image: wineById.image,
      price: wineById.price,
    };
    console.log(product);
    dispatch(addToCart(product));
  };

  const [quantity, setQuantity] = useState(1);
  const getById = (id) => {
    WineDataProvider.wineById(id).then((res) => console.log(res));
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const AddQuantity = () => {
    if (wineById.stock > quantity) {
      setQuantity(quantity + 1);
      toast.warn("Stock limit");
    }
  };
  const RemoveQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const HandleCart = () => {
  //   let product = { wineById };
  //   dispatch(sendToCart(wineById));
  // };

  const [rating, setRating] = useState(0);

  return (
    <>
      <div className={style.buttonBackground}>
        <div className={style.backButton} onClick={goBack}>
          <h3>Back</h3>
        </div>
      </div>
      <div className={style.detailBody}></div>
      <div className={style.detailBody}>
        <div className={style.containerP}>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              alt={wineById?.name}
              src={wineById?.image}
            />
          </div>

          <div className={style.info}>
            <div className={style.titleandwish}>
              <h2>
                {wineById?.winery} - {wineById?.origin}
              </h2>
            </div>

            <div className={style.masterdiv}>
              <div className={style.infoblockcontainer}>
                <div className={style.infoblock}></div>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Category:</u>
                  </span>{" "}
                  {wineById?.category}.
                </p>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Stock:</u>.
                  </span>{" "}
                  {wineById?.stock}.
                </p>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Price:</u> $ {wineById?.price}.
                  </span>
                </p>
                <button
                  onClick={() => RemoveQuantity()}
                  className={style.minusBtn}
                >
                  -
                </button>
                <input className={style.input} value={quantity}></input>
                <button onClick={() => AddQuantity()} className={style.plusBtn}>
                  +
                </button>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* {() => HandleCart()} */}
                  <button className={style.myBtn} onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className={style.containerdescription}>
          <div>
            <span className={style.descriptiontitle}>
              {" "}
              <u>Description</u>
            </span>
          </div>
          <p className={style.p}></p>
          <p className={style.description}>{wineById?.detail}</p>
        </div> */}
        <div className={style.containerdescription}>
          <p className={style.p}>
            <span className={style.descriptiontitle}>
              {" "}
              <u>Description</u>
            </span>
          </p>
          <p className={style.description}>{wineById?.detail}</p>
        </div>
        <UserReview />
        {/* <div className={style.backgroundReview}>
          <div className={style.containerreview}>
            <div className={style.rating}>
              <span className={style.reviewtitle}>
                •<u> Review:</u>
              </span>{" "}
              <Rating name="RateReview" value={rating} />
              <p>Your review is {rating} stars.</p>
            </div>

            <textarea
              value={""}
              className={style.textarea}
              placeholder="Rate this product!"
              type="textarea"
              rows={5}
              cols={5}
              maxLength="100"
            ></textarea>

            <button className={style.myBtnCalificar}>Qualify</button>
          </div>
        </div> */}
      </div>
    </>
  );
}
/*eslint-enable */
