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
import { colors } from "../styles";
import { useIntl } from "react-intl";
import { RootState } from "../../Redux/store/store";

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
      <AnimatedButton fullWidth onClick={openLink}>
        {intl.formatMessage({ id: "open" })}
      </AnimatedButton>
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
