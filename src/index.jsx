import ReactDOM from "react-dom/client";
import App from "./App";
import { preloadInitialFeed } from "./utilities/fetchFromAPI";

import "./index.css";

// Start fetching the initial feed before React renders.
preloadInitialFeed().catch(() => {});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);