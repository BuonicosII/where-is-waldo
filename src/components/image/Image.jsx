import { useState, useEffect } from "react";
import style from "./Image.module.css";
import Selector from "../selector/Selector";
import { Link } from "react-router-dom";

export default function Image() {
  const [x, getX] = useState(null);
  const [y, getY] = useState(null);
  const [size, getSize] = useState([]);
  const [spotted, setSpotted] = useState({
    one: [],
    two: [],
    three: [],
  });

  //mettere useMediaQuery e/o useEffect per far beccare al componente quando cambiano le dimensioni
  useEffect(() => {
    const height = document.getElementById(`${style.imageHolder}`).scrollHeight;
    const width = document.getElementById(`${style.imageHolder}`).scrollWidth;
    getSize([width, height]);
  }, []);

  useEffect(() => {
    function handleResize() {
      const height = document.getElementById(
        `${style.imageHolder}`
      ).scrollHeight;
      const width = document.getElementById(`${style.imageHolder}`).scrollWidth;
      if (x) {
        getX((x * width) / size[0]);
      }
      if (y) {
        getY((y * height) / size[1]);
      }
      getSize([width, height]);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function coordinates(e) {
    getX(x ? null : e.nativeEvent.offsetX);
    getY(y ? null : e.nativeEvent.offsetY);
    getSize([
      document.getElementById(`${style.imageHolder}`).scrollWidth,
      document.getElementById(`${style.imageHolder}`).scrollHeight,
    ]);
  }

  return (
    <main id={style.mainImg}>
      <div id={style.imageHolder}>
        <img
          onMouseDown={coordinates}
          src="https://upload.wikimedia.org/wikipedia/commons/0/07/Procesi%C3%B3n_de_Pascua_en_la_regi%C3%B3n_de_Kursk%2C_por_Ili%C3%A1_Repin.jpg"
          alt=""
        />
        {y !== null && x !== null && (
          <Selector
            x={x}
            y={y}
            size={size}
            spotted={spotted}
            setSpotted={setSpotted}
          />
        )}
        {spotted.one.length === 2 && (
          <div
            style={{
              left: `${(spotted.one[0] * size[0]) / 2000 - size[1] / 20}px`,
              top: `${(spotted.one[1] * size[1]) / 1235.35 - size[1] / 20}px`,
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
            }}
            className={style.spottedDiv}
          ></div>
        )}
      </div>
      {spotted.one.length === 2 &&
        spotted.two.length === 2 &&
        spotted.three.length === 2 && (
          <div className={style.gameover}>
            <div>
              <h1>GAME OVER</h1>
              <Link to="/finish">
                <button>See score</button>
              </Link>
            </div>
          </div>
        )}
    </main>
  );
}
