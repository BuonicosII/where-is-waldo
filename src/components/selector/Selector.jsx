import style from "./Selector.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Selector({ x, y, size, spotted, setSpotted }) {
  const [button, setButton] = useState(null);

  async function formSubmit(e) {
    e.preventDefault();

    const userSelection = {
      subject: button,
      minY: y - size[1] / 20,
      minX: x - size[1] / 20,
      maxY: y + size[1] / 20,
      maxX: x + size[1] / 20,
      sizeY: size[1],
      sizeX: size[0],
    };
    console.log(userSelection);

    try {
      const json = await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(userSelection),
      });

      const res = await json.json();

      if (!res.found) {
        setSpotted({ ...spotted });
      } else {
        if (res.subject === 1) {
          setSpotted({ ...spotted, one: [res.x, res.y] });
        } else if (res.subject === 2) {
          setSpotted({ ...spotted, two: [res.x, res.y] });
        } else if (res.subject === 3) {
          setSpotted({ ...spotted, three: [res.x, res.y] });
        }
        setButton(null);
      }
    } catch (err) {
      console.log(err);
    }
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
      <form action="" id={style.options} onSubmit={formSubmit}>
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
