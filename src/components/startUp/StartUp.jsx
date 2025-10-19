import { Link, useNavigate } from "react-router-dom";
import style from "./StartUp.module.css";

export default function StartUp() {
  const navigate = useNavigate();

  async function startNewGame(e) {
    e.preventDefault();

    try {
      const json = await fetch("http://localhost:3000/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const res = await json.json();

      if (typeof res === "string") {
        console.log(res);
      } else {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/game");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main id={style.mainDiv}>
      <div className={style.description}>
        <form onSubmit={startNewGame} id="newgame">
          <div>
            <h1>WHERE'S WALDO?</h1>
            <br></br>
            <p>Rules: find the three characters as fast as possibile.</p>
            <br></br>
            <p>
              Click on the image to ping a location and open the character
              selector.
            </p>
            <br></br>
            <p>
              Select the character you think you have found from the selector.
            </p>
          </div>
        </form>
        <div className={style.buttonHolder}>
          <button type="submit" form="newgame">
            New game
          </button>
          <Link to="/finish">
            <button>Best scores</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
