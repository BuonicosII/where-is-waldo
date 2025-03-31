import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Image from "./components/image/Image";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Image />
  </StrictMode>
);
