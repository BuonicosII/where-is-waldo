import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Image from "./components/image/Image";
import StartUp from "./components/startUp/StartUp";

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
    },
    {
      path: "/finish",
      element: (
        <>
          <p>End game</p>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
