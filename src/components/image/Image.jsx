import { useState } from "react";
import style from "./Image.module.css";

export default function Image() {
  const [x, getX] = useState(null);
  const [y, getY] = useState(null);
  const [size, getSize] = useState([]);

  function coordinates(e) {
    getX(e.nativeEvent.offsetX);
    getY(e.nativeEvent.offsetY);
    getSize([
      document.getElementById(`${style.imageHolder}`).scrollWidth,
      document.getElementById(`${style.imageHolder}`).scrollHeight,
    ]);
  }

  return (
    <main>
      <div id={style.imageHolder}>
        <img
          onMouseDown={coordinates}
          src="https://upload.wikimedia.org/wikipedia/commons/0/07/Procesi%C3%B3n_de_Pascua_en_la_regi%C3%B3n_de_Kursk%2C_por_Ili%C3%A1_Repin.jpg"
          alt=""
        />
        {y !== null && x !== null && (
          <div
            id={style.selection}
            style={{
              left: `${x - size[1] / 20}px`,
              top: `${y - size[1] / 20}px`,
              width: `${size[1] / 10}px`,
              height: `${size[1] / 10}px`,
            }}
          ></div>
        )}
      </div>
      <p>
        {x} e {y}
      </p>
    </main>
  );
}
