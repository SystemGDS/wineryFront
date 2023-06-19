import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import {
  getCategories,
  createProduct,
} from "../../redux/actions/actionIndex.js";
import { toast } from "react-toastify";
import s from "./ProductForm.module.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";

// const useStyles = makeStyles({
//   prodForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: '500px',
//   },
//   formField: {
//     width: '100%',
//     marginBottom: '1rem',
//   },
//   categoriesList: {
//     listStyle: 'none',
//     margin: 0,
//     padding: 0,
//   },
//   categoryItem: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
    dispatch(createProduct(newProduct));
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
    <div className={s.prodForm}>
      <Typography variant="h1">Create a new product</Typography>
      <Typography variant="h5">Complete all fields</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="name">Name:</InputLabel>
          <TextField
            id="name"
            value={input.name}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
          {err.name && <Typography color="error">{err.name}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="height">Height:</InputLabel>
          <TextField
            id="height"
            value={input.height}
            name="height"
            onChange={handleChange}
            type="number"
            placeholder="Height in cm"
          />
          {err.height && <Typography color="error">{err.height}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="weight">Weight:</InputLabel>
          <TextField
            id="weight"
            value={input.weight}
            name="weight"
            onChange={handleChange}
            type="number"
            placeholder="Weight in kg"
          />
          {err.weight && <Typography color="error">{err.weight}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="price">Price:</InputLabel>
          <TextField
            id="price"
            value={input.price}
            name="price"
            onChange={handleChange}
            type="number"
            placeholder="Price"
          />
          {err.price && <Typography color="error">{err.price}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="offert">Offert:</InputLabel>
          <TextField
            id="offert"
            value={input.offert}
            name="offert"
            onChange={handleChange}
            type="number"
            placeholder="Offert (%)"
          />
          {err.offert && <Typography color="error">{err.offert}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="stock">Stock:</InputLabel>
          <TextField
            id="stock"
            value={input.stock}
            name="stock"
            onChange={handleChange}
            type="number"
            placeholder="Stock"
          />
          {err.stock && <Typography color="error">{err.stock}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="img">Image:</InputLabel>
          <TextField
            id="img"
            value={input.img}
            name="img"
            onChange={handleChange}
            type="text"
            placeholder="Image url"
          />
          {err.img && <Typography color="error">{err.img}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="description">Description:</InputLabel>
          <TextField
            id="description"
            value={input.description}
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Description"
          />
          {err.description && (
            <Typography color="error">{err.description}</Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="categories-label">Category:</InputLabel>
          <Select
            labelId="categories-label"
            id="categories"
            value=""
            onChange={handleSelectCategory}
            placeholder="Category"
          >
            {categories.map((cat) => (
              <MenuItem value={cat._id} key={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <List dense>
            {input.categories.map((cat, idx) => (
              <ListItem key={idx} className={s.categoryItem}>
                <ListItemText primary={cat} />
                <IconButton onClick={() => handleDeleteCategory(cat)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isButtonDisabled()}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
