/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";

import { WineDataProvider } from "../../utils/WineDataProvider";
import { addToCart } from "../../Redux/Actions/actionsIndex";
import axios from "axios";

import style from "./WineDetail.module.css";

// import { Reviews } from "@mui/icons-material";
import UserReview from "../../components/Reviews/ReviewComponent";
import { Rating } from "@mui/material";

export default function WineDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const user = useSelector((state) => state.user);
  // const wines = useSelector((state) => state.wines);
  // const cart = useSelector((state) => state.cart);

  const [wineById, setWineById] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const detallesVino = async () => {
    try {
      const json = await axios.get(`/wines/${id}`);
      const wine = await json.data;

      setWineById(wine);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detallesVino();
  }, []);



  // const handleAddToCart = () => {
  //   const product = {
  //     id: wineById.id,
  //     name: wineById.name,
  //     image: wineById.image,
  //     price: wineById.price,
  //   };

  //   dispatch(addToCart(product));
  // };


  const handleAddToCart = () => {
    const product = {
      id: wineById.id,
      name: wineById.name,
      image: wineById.image,
      price: wineById.price,
      stock:wineById.stock,
      quantity: quantity
    };

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

  };

  const getById = (id) => {
    WineDataProvider.wineById(id).then((res) => console.log(res));
  };

  const goBack = () => {
    navigate(-1);
  };

  const addQuantity = () => {
    if (wineById.stock > quantity) {
      setQuantity(quantity + 1);
    }else{
      toast.warn("Stock limit");
    }
  };

  // const addQuantity = () => {
  //   if (wineById.stock > quantity) {
  //     setQuantity(quantity + 1);
  //     toast.warn("Stock limit");
  //   }
  // };


  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className={style.buttonBackground}>
        <div className={style.backButton} onClick={goBack}>
          <h3>Back</h3>
        </div>
      </div>

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
                <div className="d-flex text-align-center align-items justify-content-center">

                <button
                  onClick={removeQuantity}
                  className={style.minusBtn}
                >
                  -
                </button>
                <input
                  className={style.input}
                  value={quantity}
                  readOnly
                ></input>
                <button
                  onClick={addQuantity}
                  className={style.plusBtn}
                  readOnly
                >
                  +
                </button>

                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >

                  <button
                    className={style.myBtn}
                    onClick={handleAddToCart}
                  >

                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.containerdescription}>
          <p className={style.p}>
            <span className={style.descriptiontitle}>
              {" "}
              <u>Description</u>
            </span>
          </p>
          <p className={style.description}>{wineById?.detail}</p>
        </div>
        {wineById && <UserReview wineId={wineById.id} detallesVino={detallesVino} />}
      </div>

        <h3 className={style.h3_review}>
        <u>Reviews</u>
      </h3>
      <div className={style.reviewsContainer}>
        {wineById && wineById.reviews.length > 0 && (
          <div className={style.reviews}>
            {wineById.reviews.map((review) => (
              <div className={style.raiting} key={review.id}>
                <span className={style.commentReview}>{review.comment}</span>{" "}
                <p>
                  •{" "}
                  <b>
                    {" "}
                    <u>Rating</u>:
                  </b>
                  <Rating name="RateReview" value={review.stars} readOnly />
                </p>
                <p>
                  {" "}
                  •{" "}
                  <b>
                    <u>Comment:</u>
                  </b>{" "}
                  <span className={style.span}>{review.comment}</span>{" "}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
