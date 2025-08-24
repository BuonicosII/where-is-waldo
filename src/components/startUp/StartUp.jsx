import { useNavigate } from "react-router-dom";
import style from "./StartUp.module.css";

export default function StartUp() {
  const navigate = useNavigate();

  function startNewGame(e) {
    e.preventDefault();

    //add backend stuff

    navigate("/game");
  }

  return (
    <main id={style.mainDiv}>
      <div className={style.description}>
        <form onSubmit={startNewGame} id="newgame">
          <h1>WHERE'S WALDO?</h1>
          <p>Rules: find the three characters as fast as possibile.</p>
          <p>
            Click on the image to ping a location and open the character
            selector.
          </p>
          <p>
            Select the character you think you have found from the selector.
          </p>
        </form>
        <div className={style.buttonHolder}>
          <button type="submit" form="newgame">
            New game
          </button>
          <button>See best scores</button>
        </div>
      </div>
    </main>
  );
}
