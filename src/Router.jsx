import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Image from "./components/image/Image";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <p>start game</p>
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
