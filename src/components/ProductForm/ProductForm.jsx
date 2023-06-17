import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import {
//   getCategories,
  createWine,
} from "../../Redux/Actions/actionsIndex";
import { toast } from "react-toastify";
import s from "./ProductForm.module.css";

export default function ProductForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allCategories);
  const navigate = useNavigate();
  const [err, setErr] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    height: "",
    weight: "",
    price: "",
    img: "",
    offert: "",
    stock: "",
    categories: [],
  });

//   useEffect(() => {
//     dispatch(getCategories());
//   }, [dispatch]);

  function handleChange(e) {
    setInput((prevState) => {
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setErr(validate(newState));
      return newState;
    });
  }

  const isButtonDisabled = () => Object.keys(err).length > 0;

  const handleSelectCategory = (e) => {
    const selCategory = e.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      categories: [...prevInput.categories, selCategory],
    }));
  };

  const handleDeleteCategory = (cat) => {
    setInput({
      ...input,
      categories: input.categories.filter((c) => c !== cat),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(err).length)
      toast.warn("Please complete the form with the correct data");
    const newProduct = {
      name: input.name,
      description: input.description,
      height: Number(input.height),
      weight: Number(input.weight),
      price: Number(input.price),
      offert: Number(input.offert),
      stock: Number(input.stock),
      img: input.img,
      category: [...input.categories],
    };
    dispatch(createWine(newProduct));
    setInput({
      name: "",
      description: "",
      height: "",
      weight: "",
      price: "",
      img: "",
      offert: "",
      stock: "",
      categories: [],
    });
    navigate("/admin");
  };

  return (
    <div className={s.formCont}>
      <div className={s.prodForm}>
        <h1>
          <u>Create a new product</u>
        </h1>
        <h2>
          <u> Complete all fields </u>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Name:</u>
            </label>
            <input
              value={input.name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Name"
            />
            {err.name && <p>{err.name}</p>}
          </div>
          <br />
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Height:</u>
            </label>
            <input
              value={input.height}
              name="height"
              onChange={handleChange}
              type="number"
              placeholder="Height in cm"
            />
            {err.height && <p>{err.height}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Weight:</u>
            </label>
            <input
              value={input.weight}
              name="weight"
              onChange={handleChange}
              type="number"
              placeholder="Weight in liters"
            />
            {err.weight && <p>{err.weight}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •
            <label>
              <u>Image:</u>
            </label>
            <input
              value={input.img}
              name="img"
              onChange={handleChange}
              type="text"
              placeholder="Image URL"
            />
            {err.img && <p>{err.img}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Description:</u>
            </label>
            <textarea
              value={input.description}
              name="description"
              onChange={handleChange}
              placeholder="Description"
            ></textarea>
            {err.description && <p>{err.description}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Price:</u>
            </label>
            <input
              value={input.price}
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="Price"
            />
            {err.price && <p>{err.price}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •{" "}
            <label>
              <u>Stock:</u>
            </label>
            <input
              value={input.stock}
              name="stock"
              onChange={handleChange}
              type="number"
              placeholder="Stock Units"
            />
            {err.stock && <p>{err.stock}</p>}
            <br />
          </div>
          <div className={s.fields}>
            •
            <label>
              <u>Discount:</u>
            </label>
            <input
              value={input.offert}
              name="offert"
              onChange={handleChange}
              type="number"
              placeholder="Discount in %"
            />
            {err.offert && <p>{err.offert}</p>}
            <br />
          </div>
          •
          <label>
            <u>Category:</u>
          </label>
          <select onChange={handleSelectCategory}>
            <option disabled selected>
              Select a category
            </option>
            {categories?.map(
              (c) => c.length > 0 && <option value={c}>{c}</option>
            )}
          </select>
          <ul>
            {input.categories?.map((category, id) => (
              <li key={id}>
                {category}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            className={s.subButton}
            disabled={isButtonDisabled()}
            type="submit"
          >
            Submit your Product
          </button>
        </form>
      </div>
    </div>
  );
}
