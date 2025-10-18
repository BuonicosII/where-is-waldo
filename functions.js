export async function getGame() {
  if (localStorage.getItem("token")) {
    const gameJson = await fetch("http://localhost:3000/game", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    const game = await gameJson.json();

    return game;
  } else {
    return null;
  }
}

export async function getTopGames() {
  const gamesJson = await fetch("http://localhost:3000/game/top-games");

  const topGames = await gamesJson.json();

  return topGames;
}
