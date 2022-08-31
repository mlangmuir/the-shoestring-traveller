import ReactDOM from "react-dom/client";
import App from "./App";
import Provider from "./Context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-3g52qn3j.us.auth0.com"
    clientId="q8LwvyfY11h98fQHjnHUsx9hP5IkU39I"
    redirectUri={window.location.origin}
  >
    <Provider>
        <App />
    </Provider>
  </Auth0Provider>,
);