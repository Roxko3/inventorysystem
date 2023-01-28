import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
require("./bootstrap");

if (document.getElementById("app")) {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
        <CookiesProvider>
            <BrowserRouter basename="/InventorySystem/public/">
                <App />
            </BrowserRouter>
        </CookiesProvider>
    );
}
