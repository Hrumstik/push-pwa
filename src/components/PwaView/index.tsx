import { useEffect, useState } from "react";
import PageLoader from "../PageLoader";
import StartAgainView from "../StartAgainView";

const PwaView = ({
  pwaLink,
  allowPwaRedirect,
}: {
  pwaLink: string;
  allowPwaRedirect: boolean;
}) => {
  const [view, setView] = useState("loading");

  useEffect(() => {
    const firstVisitPwa = localStorage.getItem("firstVisitPWA");
    if (!firstVisitPwa) {
      localStorage.setItem("firstVisitPWA", "true");
    }

    const timer = setTimeout(() => {
      setView("button");
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return view === "loading" ? (
    <PageLoader pwaLink={pwaLink} allowPwaRedirect={allowPwaRedirect} />
  ) : (
    <StartAgainView pwaLink={pwaLink} />
  );
};

export default PwaView;
