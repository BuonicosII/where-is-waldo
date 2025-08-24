import style from "./Timer.module.css";
import PropTypes from "prop-types";
import { DateTime, Duration } from "luxon";
import { useState, useEffect } from "react";

export default function Timer({ gameover, setGameover }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!gameover && time < 900) {
        setTime(time + 1);
      } else if (!gameover && time === 900) {
        setGameover(new Date());
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [time, gameover, setGameover]);

  return (
    <div className={style.timerHolder}>
      <div className={style.timer}>
        <p>
          {("0" + Math.floor(time / 60)).slice(-2)}:
          {("0" + (time % 60)).slice(-2)}
        </p>
      </div>
    </div>
  );
}

Timer.propTypes = {
  gameover: PropTypes.Date,
  setGameover: PropTypes.func,
};
