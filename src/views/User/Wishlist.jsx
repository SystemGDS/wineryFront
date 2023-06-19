import { React, useState, useEffect } from "react";
import s from "./UserComponent.module.css";
import { useSelector, useDispatch } from "react-redux";
// import { useLocalStorage } from "./../productDetails/useLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  deleteFavorites,
  getFavorites,
} from "../../Redux/Actions/actionsIndex";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function WishList(product) {
  const { user } = useAuth0();
  const productsWishlist = useSelector((state) => state.wishlistProducts);
  const [quantity] = useState(1);
  // const [, setCart] = useLocalStorage("cart");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites(user.email));
  }, [dispatch, user.email, productsWishlist]);

  const handleRemove = (id) => {
    if (user.email) {
      const payload = { productId: id, email: user.email };
      dispatch(deleteFavorites(payload));
      toast.info("Product removed from your wishlist");
    }
  };

  return (
    <div className={s.scrollWish}>
      <div className={s.WishContainer}>
        <h1 className={s.WishTitle}>
          <u>Wishlist</u>
        </h1>

        <div className={s.WishCard}>
          <div className={s.listCont}>
            {productsWishlist.map((e, idx) => (
              <div className={s.favList} key={idx}>
                <DeleteForeverIcon
                  className={s.removeFav}
                  onClick={() => handleRemove(e.id)}
                />
                <Link
                  s={{ textDecoration: "none", color: "black" }}
                  to={`/products/${e.id}`}
                  key={e.id}
                >
                  <div>
                    <ul className={s.favItem} key={idx}>
                      <li>{e.name} </li>
                      <li className={s.favPrice}>${e.price}.00 </li>
                    </ul>
                  </div>
                </Link>

                {/* <div className={s.cartFav}>
                  Add to cart{" "}
                  <AddShoppingCartIcon
                    className={s.addIconFav}
                    onClick={() => {
                      const oldCart = JSON.parse(
                        window.localStorage.getItem("cart")
                      );
                      const toCart = [
                        {
                          id: e.id,
                          name: e.name,
                          price: e.price,
                          quantity: quantity,
                        },
                      ];
                      if (oldCart === null) {
                        const toCartStringify = [...toCart];
                        console.log(toCartStringify);
                        setCart(toCartStringify);
                      } else {
                        const toCartStringify = [...toCart].concat(oldCart);
                        console.log(toCartStringify);
                        console.log(
                          JSON.parse(window.localStorage.getItem("cart"))
                        );
                        setCart(toCartStringify);
                      }
                      toast.info("Product added to cart!");
                    }}
                  /> */}
              </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
