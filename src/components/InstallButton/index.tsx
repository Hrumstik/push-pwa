/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  install,
  setInstallPrompt,
  startFakeDownload,
  stopInstalling,
} from "../../Redux/feat/InstallSlice";
import { Button } from "@mui/material";
import { CustomButton, colors } from "../styles";
import { useIntl } from "react-intl";
import { RootState } from "../../Redux/store/store";
import { v4 as uuidv4 } from "uuid";

declare const window: any;

interface Props {
  appLink: string;
}

const AnimatedButton = styled<any>(motion(Button), {
  shouldForwardProp: (prop) => prop !== "$isInstalling",
})`
  border: none;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  margin-bottom: 18px;
  background-color: ${(props) =>
    props.$isInstalling ? "grey" : colors.buttonBackground};
  color: ${(props) => (props.$isInstalling ? colors.disabledText : "white")};
  &:hover {
    background-color: ${(props) =>
      props.$isInstalling ? colors.background : colors.buttonBackground};
    box-shadow: none;
  }
  &:active {
    background-color: ${(props) =>
      props.$isInstalling ? colors.background : colors.buttonBackground};
  }
`;

const InstallButton: React.FC<Props> = ({ appLink }) => {
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
  const isDownloading = useSelector(
    (state: RootState) => state.install.fakeDownload
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  const sendRequest = async () => {
    try {
      const userId = uuidv4();
      localStorage.setItem("userId", userId);
      let OSName = "Unknown OS";
      if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
      if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
      const lang = navigator.language;
      const date = new Date().toISOString();
      const domain = window.location.hostname;
      axios.post(
        `https://pnsynd.com/api/pwa/add-user/userID=${userId}&language=${lang}&install_datatime=${date}&dep=${false}&reg=${false}&os=${OSName}&name=${domain}`
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  const downloadPWA = () => {
    dispatch(startFakeDownload());
  };

  const installPWA = async () => {
    if (installPrompt) {
      dispatch(install());
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        if (window.fbq) {
          window.fbq("track", "Lead");
        }
        sendRequest();
      } else {
        dispatch(stopInstalling());
      }
      dispatch(setInstallPrompt(null));
    }
  };

  const openLink = () => {
    window.open(appLink, "_blank");
  };

  if (isDownloaded && isInstalled) {
    return (
      <CustomButton fullWidth onClick={openLink}>
        {intl.formatMessage({ id: "open" })}
      </CustomButton>
    );
  }

  if (!isDownloaded && !isInstalled) {
    return (
      <AnimatedButton
        fullWidth
        onClick={!isDownloading ? downloadPWA : undefined}
        $isInstalling={isDownloading}
        disabled={isDownloading}
      >
        {isDownloading
          ? intl.formatMessage({
              id: "downloading",
              defaultMessage: "Downloading",
            })
          : intl.formatMessage({ id: "download", defaultMessage: "Download" })}
      </AnimatedButton>
    );
  }

  if (isDownloaded && !isInstalled) {
    return (
      <AnimatedButton
        fullWidth
        onClick={!isInstalling ? installPWA : undefined}
        $isInstalling={isInstalling}
        disabled={isInstalling}
      >
        {isInstalling
          ? intl.formatMessage({ id: "installing" })
          : intl.formatMessage({ id: "install" })}
      </AnimatedButton>
    );
  }
};

export default InstallButton;
