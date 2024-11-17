import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { useIntl } from "react-intl";
import {
  install,
  setInstallPrompt,
  stopInstalling,
} from "../../../Redux/feat/InstallSlice";
import { Button } from "@mui/material";

interface Props {
  appLink: string;
}

const RateInstallButton: React.FC<Props> = ({ appLink }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const installPrompt = useSelector(
    (state: RootState) => state.install.installPrompt
  );
  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );
  const isDownloaded = useSelector(
    (state: RootState) => state.install.isDownloaded
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    const handleAppInstalled = () => {
      setTimeout(() => {
        setIsInstalled(true);
        dispatch(stopInstalling());
      }, 10000);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [dispatch]);

  const installPWA = async () => {
    if (installPrompt) {
      dispatch(install());
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted installation");
      } else {
        dispatch(stopInstalling());
      }
      dispatch(setInstallPrompt(null));
    }
  };

  const openLink = () => {
    window.open(appLink, "_blank");
  };

  if (isInstalled) {
    return (
      <Button onClick={openLink} fullWidth>
        {intl.formatMessage({ id: "open" })}
      </Button>
    );
  }

  return (
    <Button
      onClick={installPWA}
      color="success"
      variant="text"
      disabled={isInstalling || !isDownloaded}
      fullWidth
    >
      {isInstalling
        ? intl.formatMessage({ id: "installing" })
        : intl.formatMessage({ id: "install" })}
    </Button>
  );
};

export default RateInstallButton;
