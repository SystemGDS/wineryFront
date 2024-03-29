/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Styles from "./Pagination.module.css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export default function Pagination({ page, setPage, maxPage, wines }) {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(input + 1);
    setPage(page + 1);
  };

  const prevPage = () => {
    setInput(input - 1);
    setPage(page - 1);
  };

  useEffect(() => {
    setInput(1);
  }, [wines]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > maxPage ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={Styles.backGroundPage}>
      <div className={Styles.pagination}>
        <button disabled={page <= 1} onClick={prevPage}>
          <GrLinkPrevious />
        </button>
        <input
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          value={page}
        ></input>
        <p className={Styles.max_page}>of&nbsp;&nbsp;&nbsp;{maxPage} </p>
        <button disabled={page >= maxPage} onClick={nextPage}>
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
}
