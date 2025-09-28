import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { getGame } from "../functions";
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
    },
  ]);

  return <RouterProvider router={router} />;
}
