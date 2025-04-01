import style from "./Selector.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Selector({ x, y, size }) {
  const [button, setButton] = useState(null);

  function formSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      id={style.selectorHolder}
      style={{
        left: `${x - size[1] / 20}px`,
        top: `${y - size[1] / 20}px`,
      }}
    >
      <div
        id={style.selection}
        style={{
          width: `${size[1] / 10}px`,
          height: `${size[1] / 10}px`,
        }}
      ></div>
      <form action="" id={style.options}>
        <button
          className={style.imgButton}
          onClick={() => {
            setButton(1);
          }}
          style={{
            width: `${size[1] / 10}px`,
            height: `${size[1] / 10}px`,
          }}
        ></button>
        <button
          className={style.imgButton}
          onClick={() => {
            setButton(2);
          }}
          style={{
            width: `${size[1] / 10}px`,
            height: `${size[1] / 10}px`,
          }}
        ></button>
        <button
          className={style.imgButton}
          onClick={() => {
            setButton(3);
          }}
          style={{
            width: `${size[1] / 10}px`,
            height: `${size[1] / 10}px`,
          }}
        ></button>
      </form>
    </div>
  );
}

Selector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.array,
};
