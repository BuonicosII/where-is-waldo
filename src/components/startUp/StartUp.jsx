import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./StartUp.module.css";

export default function StartUp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);

  const navigate = useNavigate();

  function inputUpdate(e) {
    e.preventDefault();
    setName(document.querySelector("#name").value);
  }

  function startNewGame(e) {
    e.preventDefault();

    //add backend stuff

    navigate("/game");
  }

  return (
    <main id={style.mainDiv}>
      {!open && (
        <div className={style.description}>
          <h1>WHERE'S WALDO?</h1>
          <p>Rules: find the three characters as fast as possibile.</p>
          <p>
            Click on the image to ping a location and open the character
            selector.
          </p>
          <p>
            Select the character you think you have found from the selector.
          </p>
          <div className={style.buttonHolder}>
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              New game
            </button>
            <button>See best scores</button>
          </div>
        </div>
      )}
      {open && (
        <div className={style.popup}>
          <form onSubmit={startNewGame} id="newgame">
            <div className={style.inputHolder}>
              <label htmlFor="">Enter a name:</label>
              <input
                onChange={inputUpdate}
                type="text"
                id="name"
                name="name"
                value={name}
                required
              />
            </div>
          </form>
          <div className={style.buttonHolder}>
            <button type="submit" form="newgame">
              Start
            </button>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
