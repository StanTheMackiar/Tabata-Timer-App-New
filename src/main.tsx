import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initEruda } from "./utils/eruda";
import { applyNativeWebViewRules } from "./utils/native-webview";

applyNativeWebViewRules();
document.addEventListener("DOMContentLoaded", initEruda);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
