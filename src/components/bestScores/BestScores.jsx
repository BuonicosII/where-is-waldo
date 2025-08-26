import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BestScores.module.css";

export default function BestScores() {
  const game = { length: 900 };
  const topGames = [
    { id: 1, user: "AAA", length: 75 },
    { id: 2, user: "BBB", length: 90 },
  ];

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  function inputUpdate(e) {
    e.preventDefault();
    setName(document.querySelector("#name").value);
  }

  function returnStart() {
    if (game.length) {
      //cancella localStorage
    }

    navigate("/");
  }

  function saveRecord(e) {
    e.preventDefault();

    if (topGames.length < 10 || topGames[9].length > game.length) {
      //aggiorna il record

      //cancella localStorage

      setOpen(false);
    }
  }

  return (
    <main id={style.mainDiv}>
      <div id={style.scores}>
        {topGames.map((game, index) => {
          return (
            <div key={game.id} className={style.entry}>
              <span>
                {index + 1}. {game.user}
              </span>
              <span>
                Time: {("0" + Math.floor(game.length / 60)).slice(-2)}:
                {("0" + (game.length % 60)).slice(-2)}
              </span>
            </div>
          );
        })}
      </div>
      <div id={style.gameScoreHolder}>
        {game.length && (
          <div id={style.gameScore}>
            <span>You</span>
            <span>
              {" "}
              Time: {("0" + Math.floor(game.length / 60)).slice(-2)}:
              {("0" + (game.length % 60)).slice(-2)}
            </span>
          </div>
        )}
        <div className={style.buttonHolder}>
          <button onClick={returnStart}>Go to new game</button>
          {game.length &&
            (topGames.length < 10 || topGames[9].length > game.length) && (
              <button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Save record
              </button>
            )}
        </div>
        {open && (
          <div className={style.popupHolder}>
            <div id={style.saveGameHolder}>
              <form id="savegame" onSubmit={saveRecord}>
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
                  Save record
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
          </div>
        )}
      </div>
    </main>
  );
}
