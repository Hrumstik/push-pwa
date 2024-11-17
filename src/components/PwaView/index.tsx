import { useEffect, useState } from "react";
import PageLoader from "../PageLoader";
import StartAgainView from "../StartAgainView";

const PwaView = () => {
  const [view, setView] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setView("button");
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return view === "loading" ? <PageLoader /> : <StartAgainView />;
};

export default PwaView;
