import style from "./Timer.module.css";
import { DateTime, Duration } from "luxon";
import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(850);

  useEffect(() => {
    const interval = setTimeout(() => {
      console.log(time);
      if (time < 900) {
        setTime(time + 1);
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [time]);

  return (
    <>
      <p>
        {("0" + Math.floor(time / 60)).slice(-2)}:
        {("0" + (time % 60)).slice(-2)}
      </p>
    </>
  );
}
