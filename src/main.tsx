import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./Redux/store/store.tsx";
import { Provider } from "react-redux";
import { MixpanelProvider } from "react-mixpanel-browser";
import "normalize.css";
import LocaleProvider from "./LocaleProvider.tsx";
import { requestPermissionForOneSignal } from "./pushNotificationService.ts";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    requestPermissionForOneSignal();
  });
}

const MIXPANEL_TOKEN = "17065ccd70b890e3585fc6a46505aff7";

const MIXPANEL_CONFIG = {
  debug: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MixpanelProvider config={MIXPANEL_CONFIG} token={MIXPANEL_TOKEN}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </MixpanelProvider>
    </Provider>
  </React.StrictMode>
);
