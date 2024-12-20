import CircularProgress from "@mui/material/CircularProgress";
import {
  AppImg,
  LogoContainer,
  LogoInProgressContainer,
  LogoInProgressWrapper,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { useEffect, useState } from "react";
import {
  setFakeDownloadProgress,
  setIsDownloaded,
  stopFakeFakeDownload,
} from "../../Redux/feat/InstallSlice";
import useSanity from "../../shared/hooks/useSanity";

function AppLogo() {
  const { data, urlFor } = useSanity(`appIcon`);

  const [installProgressNumber, setInstallProgressNumber] = useState(0);
  const dispatch = useDispatch();

  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );

  const isFakeDownloadStarted = useSelector(
    (state: RootState) => state.install.fakeDownload
  );

  useEffect(() => {
    const fakeInstall = async () => {
      let progress = 0;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const randomIncrement = Math.random() * (30 - 10) + 10;
        progress += randomIncrement;
        progress = Math.min(progress, 100);
        progress = Math.floor(progress);

        dispatch(setFakeDownloadProgress(progress));
        setInstallProgressNumber(progress);

        const elapsedTime = (Date.now() - startTime) / 1000;

        if (progress >= 100 && elapsedTime >= 8) {
          clearInterval(interval);
          dispatch(stopFakeFakeDownload());
          dispatch(setFakeDownloadProgress(0));
          dispatch(setIsDownloaded());
        }
      }, 1000);
    };

    if (isFakeDownloadStarted) {
      fakeInstall();
    }
  }, [isFakeDownloadStarted, dispatch]);

  const showCircularProgress = isFakeDownloadStarted;
  const showPermanentCircularProgress = isInstalling && !isFakeDownloadStarted;
  const showLogo = !isInstalling && !isFakeDownloadStarted;

  if (!data) return null;

  return (
    <>
      {showCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg
              src={urlFor(data.appIcon)}
              alt="App logo"
              width={64}
              height={64}
            />
          </LogoInProgressContainer>

          <CircularProgress
            variant="determinate"
            value={installProgressNumber}
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showPermanentCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg
              src={urlFor(data.appIcon)}
              alt="App logo"
              width={64}
              height={64}
            />
          </LogoInProgressContainer>

          <CircularProgress
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showLogo && (
        <LogoContainer>
          <AppImg
            src={urlFor(data.appIcon)}
            alt="App logo"
            width={64}
            height={64}
          />
        </LogoContainer>
      )}
    </>
  );
}

export default AppLogo;
