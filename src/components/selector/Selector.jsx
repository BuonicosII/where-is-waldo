import style from "./Selector.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import subject1 from "../../assets/subject1.png";
import subject2 from "../../assets/subject2.png";
import subject3 from "../../assets/subject3.png";

export default function Selector({ x, y, size, spotted, setSpotted }) {
  const [button, setButton] = useState(null);

  async function formSubmit(e) {
    e.preventDefault();

    const userSelection = {
      subject: button,
      minY: ((y - size[1] / 20) * 1235.35) / size[1],
      minX: ((x - size[1] / 20) * 2000) / size[0],
      maxY: ((y + size[1] / 20) * 1235.35) / size[1],
      maxX: ((x + size[1] / 20) * 2000) / size[0],
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
        {spotted.one.length !== 2 ? (
          <button
            className={style.imgButton}
            onClick={() => {
              setButton(1);
            }}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject1}")`,
            }}
          ></button>
        ) : (
          <button
            className={style.imgButton}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject1}")`,
            }}
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "brightness(0.5)",
              }}
            >
              <path
                fill="none"
                stroke="#00aa1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 12l5 5L20 7"
              />
            </svg>
          </button>
        )}
        {spotted.two.length !== 2 ? (
          <button
            className={style.imgButton}
            onClick={() => {
              setButton(2);
            }}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject2}")`,
            }}
          ></button>
        ) : (
          <button
            className={style.imgButton}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject2}")`,
            }}
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "brightness(0.5)",
              }}
            >
              <path
                fill="none"
                stroke="#00aa1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 12l5 5L20 7"
              />
            </svg>
          </button>
        )}
        {spotted.three.length !== 2 ? (
          <button
            className={style.imgButton}
            onClick={() => {
              setButton(3);
            }}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject3}")`,
            }}
          ></button>
        ) : (
          <button
            className={style.imgButton}
            style={{
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
              backgroundImage: `url("${subject3}")`,
            }}
            disabled
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "brightness(0.5)",
              }}
            >
              <path
                fill="none"
                stroke="#00aa1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 12l5 5L20 7"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}

Selector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.array,
};
