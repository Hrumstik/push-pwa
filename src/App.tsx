import { useEffect, useState } from "react";
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
  const [allowPwaRedirect, setAllowPwaRedirect] = useState(false);
  const dispatch = useDispatch();

  const { VITE_APP_VAPID_KEY, VITE_API_TOKEN } = import.meta.env;

  useEffect(() => {
    const registerServiceWorkerAndGetToken = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );
          const pushDataSent = localStorage.getItem("pushDataSent");
          if (pushDataSent) {
            setAllowPwaRedirect(true);
            return;
          }

          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            const token = await getToken(messaging, {
              vapidKey: VITE_APP_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });
            const userId = localStorage.getItem("userId");
            const res = await axios.post(
              `https://pnsynd.com/api/pwa/add-user/token=${token}&userID=${userId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzQ2NGU2MjAzZmMwMDJiNzU2NGNjYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTQ4Njk5N30.9o3UcBQldUSh3aScqmsGxpQzaQ7UddQEwB4i0M89D6A`,
                },
              }
            );
            localStorage.setItem("pushDataSent", "true");
            alert(res.status);
          } else {
            setAllowPwaRedirect(true);
          }
        } catch (error) {
          alert(error);
          console.error(error);
          setTimeout(registerServiceWorkerAndGetToken, 500);
        } finally {
          setAllowPwaRedirect(true);
        }
      } else {
        console.error("The browser does not support service worker");
        setAllowPwaRedirect(true);
      }
    };

    if (isPWAActive) {
      registerServiceWorkerAndGetToken();
    }
  }, [isPWAActive, VITE_APP_VAPID_KEY, VITE_API_TOKEN]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
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
  }, [dispatch]);

  useEffect(() => {
    const isPWAActivated = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    setIsPWAActive(isPWAActivated);

    if (/FBA[NV]/.test(navigator.userAgent)) {
      const intentUrl = `intent://${window.location.hostname}${
        window.location.pathname
      }${
        window.location.search
      }#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end`;

      window.location.href = intentUrl;
    }
  }, []);

  useEffect(() => {
    if (data) {
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
          if (!localStorage.getItem("landing_page_firstOpen_tracked")) {
            const params = Object.fromEntries(searchParams);
            params["domain"] = window.location.hostname;
            params["startURL"] = window.location.href;
            params["pwaLink"] = newPwaLink;

            localStorage.setItem("landing_page_firstOpen_tracked", "true");
          }
        };

        if (!/FBA[NV]/.test(navigator.userAgent)) {
          trackFirstOpen();
        }
      }, 3000);
    }
  }, [data]);

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

  return isPWAActive && data?.pwaLink ? (
    <PwaView pwaLink={data?.pwaLink} allowPwaRedirect={allowPwaRedirect} />
  ) : (
    <>{currentView}</>
  );
}
