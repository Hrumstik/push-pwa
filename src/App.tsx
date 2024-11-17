import { useEffect, useState } from "react";
import { useMixpanel } from "react-mixpanel-browser";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import MainView from "./components/MainView";
import AboutView from "./components/AboutView";
import PwaView from "./components/PwaView";
import ReviewsView from "./components/ReviewsView";
import { useDispatch } from "react-redux";
import {
  setInstallPrompt,
  setIsDownloaded,
  stopFakeFakeDownload,
} from "./Redux/feat/InstallSlice";
import useSanity from "./shared/hooks/useSanity";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import axios from "axios";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function App() {
  const { data } = useSanity("pwaLink");
  const [view, setView] = useState("main");
  const [isPWAActive, setIsPWAActive] = useState(false);
  const mixpanel = useMixpanel();
  const dispatch = useDispatch();

  const { VITE_APP_VAPID_KEY, VITE_API_TOKEN } = import.meta.env;

  useEffect(() => {
    const registerServiceWorkerAndGetToken = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );

          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            const token = await getToken(messaging, {
              vapidKey: VITE_APP_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });

            if (token) {
              const datatime = new Date().toISOString();
              const os = /Android/i.test(navigator.userAgent)
                ? "Android"
                : "unknown";

              try {
                const locationResponse = await axios.get(
                  "https://ipinfo.io/json"
                );
                const countryCode = (
                  locationResponse.data as { country: string }
                )?.country;

                const url = `https://pnsynd.com/api/pwa/add-user/token=${token}&country=${countryCode}&install_datatime=${datatime}&dep=false&reg=false&os=${os}&name=${window.location.hostname}`;
                alert(url);
                await axios.post(
                  url,
                  {},
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${VITE_API_TOKEN}`,
                    },
                  }
                );
                alert("User added");
              } catch (error) {
                alert(error);
                console.error(error);
              }
            }
          }
        } catch (error) {
          console.error(error);
          setTimeout(registerServiceWorkerAndGetToken, 1000);
        }
      } else {
        console.error("The browser does not support service worker");
      }
    };

    if (isPWAActive) {
      registerServiceWorkerAndGetToken();
    }
  }, [isPWAActive, VITE_APP_VAPID_KEY, VITE_API_TOKEN]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      dispatch(setInstallPrompt(e));
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    setTimeout(() => {
      dispatch(stopFakeFakeDownload());
      dispatch(setIsDownloaded());
    }, 10000);

    if (localStorage.getItem("landing_page_firstOpen_tracked")) {
      dispatch(setIsDownloaded());
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, [dispatch, mixpanel]);

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      if (mixpanel) {
        mixpanel.track("landing_page_facebook_browser_open");
      }
      const intentUrl = `intent://${window.location.hostname}${
        window.location.pathname
      }${
        window.location.search
      }#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end`;
      if (mixpanel) {
        mixpanel.track("landing_page_facebook_browser_redirect");
      }
      window.location.href = intentUrl;
    }
  }, [mixpanel]);

  useEffect(() => {
    if (data) {
      const distinct_id = uuidv4();
      if (mixpanel) {
        mixpanel.identify(distinct_id);
      }

      setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search);

        let newPwaLink = data?.pwaLink;
        let pixelId: string | null = "";

        const fbc = Cookies.get("_fbc");
        const fbp = Cookies.get("_fbp");

        if (searchParams.has("idpixel") || searchParams.has("sub_id_7")) {
          pixelId = searchParams.has("idpixel")
            ? searchParams.get("idpixel")
            : searchParams.get("sub_id_7");
          newPwaLink += `?sub_id_7=${pixelId}`;
        }

        if (fbp || fbc) {
          newPwaLink += `${
            newPwaLink.includes("?") ? "&" : "?"
          }sub_id_8=${fbp}&sub_id_9=${fbc}`;
        }

        searchParams.forEach((value, key) => {
          if (key !== "idpixel" && key !== "sub_id_7") {
            newPwaLink += `${
              newPwaLink.includes("?") ? "&" : "?"
            }${key}=${value}`;
          }
        });

        const domain = window.location.hostname;
        newPwaLink += `${
          newPwaLink.includes("?") ? "&" : "?"
        }sub_id_13=${domain}`;

        const pwaLink = localStorage.getItem("pwaLink");
        if (!pwaLink) {
          localStorage.setItem("pwaLink", newPwaLink);
        }

        const trackFirstOpen = () => {
          if (
            !localStorage.getItem("landing_page_firstOpen_tracked") &&
            mixpanel
          ) {
            const params = Object.fromEntries(searchParams);
            params["domain"] = window.location.hostname;
            params["startURL"] = window.location.href;
            params["pwaLink"] = newPwaLink;
            mixpanel.track("landing_page_firstOpen", {
              ...params,
            });
            localStorage.setItem("landing_page_firstOpen_tracked", "true");
          }
        };

        const pushPwaLink = localStorage.getItem("newPwaLink");

        console.log(fbc, fbp);

        if (mixpanel) {
          mixpanel.register({
            fbc: `${fbc}`,
            fbp: `${fbp}`,
            pwaLink: `${pushPwaLink}`,
          });
        }
        if (!/FBA[NV]/.test(navigator.userAgent)) {
          trackFirstOpen();
        }
      }, 3000);
    }
  }, [mixpanel, data]);

  let currentView;

  switch (view) {
    case "main":
      currentView = <MainView setView={setView} />;
      break;
    case "about":
      currentView = <AboutView setView={setView} />;
      break;
    case "reviews":
      currentView = <ReviewsView setView={setView} />;
  }

  return isPWAActive ? <PwaView /> : <>{currentView}</>;
}
