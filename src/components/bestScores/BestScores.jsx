import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BestScores.module.css";
import { useLoaderData } from "react-router-dom";

export default function BestScores() {
  const data = useLoaderData();

  const game = data[0];
  const topGames = data[1];

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  function inputUpdate(e) {
    e.preventDefault();
    setName(document.querySelector("#name").value);
  }

  function returnStart() {
    if (game && game.length) {
      localStorage.removeItem("token");
    }

    navigate("/");
  }

  async function saveRecord(e) {
    e.preventDefault();

    if (
      (game && game.length && topGames.length < 10) ||
      topGames[9].length > game.length
    ) {
      try {
        await fetch("http://localhost:3000/game/player", {
          method: "PUT",
          body: JSON.stringify({ name: name }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
      setOpen(false);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <main id={style.mainDiv}>
      <div id={style.scores}>
        {topGames.map((game, index) => {
          return (
            <div key={game.id} className={style.entry}>
              <span>
                {index + 1}. {game.player}
              </span>
              <span>
                Time:{" "}
                {("0" + Math.floor(Math.round(game.length) / 60)).slice(-2)}:
                {("0" + (Math.round(game.length) % 60)).slice(-2)}
              </span>
            </div>
          );
        })}
      </div>
      <div id={style.gameScoreHolder}>
        {game && game.length && (
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
          <button onClick={returnStart}>New game</button>
          {game &&
            game.length &&
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
                <button type="submit" form="savegame">
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
