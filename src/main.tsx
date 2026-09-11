import ReactDOM from "react-dom/client";
import App from "./App";
import { applyNativeWebViewRules } from "./utils/native-webview";

applyNativeWebViewRules();

// Sin StrictMode a propósito: el doble montaje duplicaría los efectos que
// arman el reloj de la sesión.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
