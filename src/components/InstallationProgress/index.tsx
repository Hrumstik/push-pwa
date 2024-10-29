import { useIntl } from "react-intl";
import {
  AppDeveloperСompanyName,
  InstallationProgessWrapper,
  PercentagesMessage,
  VerifiedConteiner,
} from "../styles";
import { useSelector } from "react-redux";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { RootState } from "../../Redux/store/store";
import useSanity from "../../shared/hooks/useSanity";

export default function InstallationProgess() {
  const intl = useIntl();

  const { data } = useSanity(`developerName`);

  const isDownloading = useSelector(
    (state: RootState) => state.install.fakeDownload
  );

  const fakeDownloadProgress = useSelector(
    (state: RootState) => state.install.fakeDownloadProgress
  );

  return isDownloading ? (
    <InstallationProgessWrapper>
      <PercentagesMessage>{fakeDownloadProgress}</PercentagesMessage>
      <VerifiedConteiner>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 10, color: "green" }} />
        {intl.formatMessage({ id: "verified" })}
      </VerifiedConteiner>
    </InstallationProgessWrapper>
  ) : (
    <AppDeveloperСompanyName>{data?.developerName}</AppDeveloperСompanyName>
  );
}
