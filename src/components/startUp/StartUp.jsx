import { useState } from "react";
import style from "./StartUp.module.css";

export default function StartUp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);

  function inputUpdate(e) {
    e.preventDefault();
    setName(document.querySelector("#name").value);
  }

  function startNewGame(e) {
    e.preventDefault();
  }

  return (
    <main>
      <div>
        <h1>WHERE'S WALDO?</h1>
        <p>Rules: find the three characters as fast as possibile.</p>
        <p>
          Click on the image to ping a location and open the character selector.
        </p>
        <p>Select the character you think you have found from the selector.</p>
        <div>
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
      {open && (
        <div className={style.gamestart}>
          <form onSubmit={startNewGame} id="newgame">
            <div>
              <label htmlFor="">Enter a name:</label>
              <input
                onChange={inputUpdate}
                type="text"
                id="name"
                name="name"
                value={name}
              />
            </div>
          </form>
          <div>
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
