/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card/Card.jsx";
import styles from "../Shop/Shop.module.css";
import SerchBar from "../../components/SearchBar/SearchBar.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { getWines, getFiltersWine } from "../../Redux/Actions/actionsIndex.js";
import Loader from "../../components/Loader/Loader.jsx";

const shop = () => {
  const dispatch = useDispatch();
  const wines = useSelector((store) => store.wines);

  const [originFilter, setOriginFilter] = useState("");
  const isLoading = useSelector((store) => store.isLoading);
  const [origin, setOrigin] = useState(null);
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const [name, setName] = useState("");
  const [order, setOrder] = useState("");

  const handleChangeName = (filtername) => setName(filtername);

  const maxPage = Math.ceil(wines.length / perPage);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleChecked = (e) => {
    const { name } = e.target;
    const newChecked = [...checkedItems];

    if (newChecked.includes(name)) {
      const indice = newChecked.indexOf(name);

      if (indice > -1) {
        newChecked.splice(indice, 1);
      }
    } else {
      newChecked.push(name);
    }
    setCheckedItems([...newChecked]);
  };

  const handleSelect = (e) => {  
    setOriginFilter(e.target.value);
  };

  const higher_At_Lower_Price = () => {
    setOrder("max");
    setPage(1);
  };

  const lower_To_Higher_Price = () => {
    setOrder("min");
    setPage(1);
  };

  useEffect(() => {
    (async () => {
      try {
        // http://localhost:3001
        const response = await fetch("https://wineryback-production.up.railway.app/wines");
        const data = await response.json();
        const paises = [];
        await data?.forEach((el) => {
          let division = el.origin.split("-")[0];
          paises.push(division);
        });
        const newarray = new Set(paises);
        const set = Array.from(newarray);
        setOrigin(Array.from(newarray));
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    dispatch(getWines());
  }, []);

  useEffect(() => {
    setPage(1);
    setPerPage(9);
  }, [wines]);

  const handleFilter = function () {
    dispatch(getFiltersWine(checkedItems, originFilter, name));
    setPage(1);
    setOrder("");
  };

  const clearFilters = () => {
    dispatch(getWines());
    setName("");
    setSelect("");
    setOrder("");
    const inputsCheckbox = document.querySelectorAll("input");
    inputsCheckbox.forEach((input) => {
      input.checked = false;
    });
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className={styles.filterContainer}>
        <div className={styles.categoryContainer}>
          <p className={styles.filter}>Filters by categories</p>

          <div className={styles.containerWines}>
            <label className={styles.labelFilter}>
              <input type="checkbox" name="Red Wine" onChange={handleChecked} />{" "}
              Red Wine
            </label>
            <label className={styles.labelFilter}>
              <input
                type="checkbox"
                name="White Wine"
                onChange={handleChecked}
              />{" "}
              White Wine
            </label>
            <label className={styles.labelFilter}>
              <input
                type="checkbox"
                name="Rose wine"
                onChange={handleChecked}
              />{" "}
              Rose Wine
            </label>
            <label className={styles.labelFilter}>
              <input
                type="checkbox"
                name="Sparkling Wine"
                onChange={handleChecked}
              />{" "}
              Sparkling Wine
            </label>
          </div>

          <select
            className={styles.countries}
            value={originFilter}
            onChange={handleSelect}
          >
            <option value="">Filter by countries</option>
            {origin?.map((or, i) => (
              <option value={or} key={i} >
                {or}
              </option>
            ))
            }
          </select>
          

          <div className={styles.mainFilter}>
            <button
              className={styles.buttonFilter}
              onClick={(e) => handleFilter(e)}
            >
              Apply Filters
            </button>
            <button className={styles.buttonFilter} onClick={clearFilters}>
              Clear Filters
            </button>
        

          <button
            className={styles.buttonFilter}
            onClick={higher_At_Lower_Price}
          >
            Higher at Lower Price
          </button>
          <button
            className={styles.buttonFilter}
            onClick={lower_To_Higher_Price}
          >
            Lower to Higher Price
          </button>

          </div>

        </div>

        {Array.isArray(wines) && wines?.length !== 0 ? (
          <div className={styles.cardsContainer}>
            {wines
              ?.sort((a, b) => {
                if (order === "") return;
                if (order === "max") return b.price - a.price;
                if (order === "min") return a.price - b.price;
              })
              .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
              .map((wine) =>
                (wine.stock > 0 && !wine.banned  )?
                  <Card 
                    id={wine?.id}
                    key={wine?.id}
                    name={wine?.name}
                    image={wine?.image}
                    price={wine?.price}
                    origin={wine?.origin}
                    category={wine?.category}
                    stock={wine?.stock}
                    banned={wine?.banned}
                  ></Card>
                : null
              
              
              )}
          </div>
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p>There are no products with those parameters</p>
          </div>
        )}
      </div>
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
};

export default shop;
