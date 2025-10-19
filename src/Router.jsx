import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { getGame, getTopGames } from "../functions";
import Image from "./components/image/Image";
import StartUp from "./components/startUp/StartUp";
import BestScores from "./components/bestScores/BestScores";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <StartUp />
        </>
      ),
    },
    {
      path: "/game",
      element: (
        <>
          <Image />
        </>
      ),
      loader: async () => {
        const data = await getGame();

        if (!data) {
          return redirect("/");
        } else if (data.endDate) {
          return redirect("/finish");
        }

        return data;
      },
    },
    {
      path: "/finish",
      element: (
        <>
          <BestScores />
        </>
      ),
      loader: async () => {
        const data = await Promise.all([getGame(), getTopGames()]);
        if (data[0] && data[0].endDate) {
          const date1 = new Date(data[0].startDate).getTime();
          const date2 = new Date(data[0].endDate).getTime();
          data[0].length = Math.round((date2 - date1) / 1000);
          data[1] = data[1].filter((item) => item.id !== data[0].id);
        }

        return data;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}
