import { Dispatch, SetStateAction, useState } from "react";
import { useIntl } from "react-intl";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ViewHeader from "../ViewHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ViewAppContainer,
  AboutAppSectionTitle,
  AboutGameTextContainer,
  AppInfoContainer,
  AppInfoRow,
  AppInfoRowText,
  AppInfoTitle,
  HorizontalDivider,
  MainContentSection,
  Section,
  colors,
  AppCompatibilityContainer,
  AppCompatibilityTitle,
  ViewFooter,
} from "../styles";
import { Button, IconButton } from "@mui/material";
import InstallButton from "../InstallButton";
import useSanity from "../../shared/hooks/useSanity";
import { checkLocale } from "../../shared/helpers/languages";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
}

const AboutView: React.FC<Props> = ({ setView }) => {
  const intl = useIntl();

  const [dialog, setDialog] = useState(false);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const { data } = useSanity(
    "fullDescription, size, version, countOfDownloads"
  );

  if (!data) return null;

  return (
    <ViewAppContainer>
      <ViewHeader id="details" setView={setView} />
      <MainContentSection>
        <AboutAppSectionTitle>
          {intl.formatMessage({ id: "about" })}
        </AboutAppSectionTitle>
        <AboutGameTextContainer>
          {data?.fullDescription[checkLocale()]}
        </AboutGameTextContainer>
      </MainContentSection>
      <HorizontalDivider />
      <Section>
        <AboutAppSectionTitle>
          {intl.formatMessage({ id: "whatsNew" })}

          <FiberManualRecordIcon
            style={{
              color: `${colors.primary}`,
              fontSize: 12,
              marginLeft: "6px",
            }}
          />
        </AboutAppSectionTitle>
        <AboutGameTextContainer>
          {intl.formatMessage({ id: "newBonuses" })}
        </AboutGameTextContainer>
      </Section>
      <HorizontalDivider />
      <Section>
        <AppInfoTitle>{intl.formatMessage({ id: "appInfo" })}</AppInfoTitle>
        <AppInfoContainer>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "version" })}
            </AppInfoRowText>
            <AppInfoRowText>{data.version}</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "updatedOn" })}
            </AppInfoRowText>
            <AppInfoRowText>{getTodayDate()}</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloads" })}
            </AppInfoRowText>
            <AppInfoRowText>{data.countOfDownloads}</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloadSize" })}
            </AppInfoRowText>
            <AppInfoRowText>{data.size}</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "offeredBy" })}
            </AppInfoRowText>
            <AppInfoRowText>Nine Dev</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "releasedOn" })}
            </AppInfoRowText>
            <AppInfoRowText>
              {intl.formatMessage({ id: "releaseDate" })}
            </AppInfoRowText>
          </AppInfoRow>
        </AppInfoContainer>
      </Section>
      <HorizontalDivider />
      <Section>
        <AppCompatibilityTitle>
          {intl.formatMessage({ id: "compatibilityTitle" })}
          <IconButton onClick={handleClickOpen}>
            <InfoOutlinedIcon />
          </IconButton>
        </AppCompatibilityTitle>
        <AppCompatibilityContainer>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "compatibility" })}
            </AppInfoRowText>
            <AppInfoRowText>
              {intl.formatMessage({ id: "worksOnYourDevice" })}
            </AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "version" })}
            </AppInfoRowText>
            <AppInfoRowText>2.12.14</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloadSize" })}
            </AppInfoRowText>
            <AppInfoRowText>15,23 MB</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "RequiredOS" })}
            </AppInfoRowText>
            <AppInfoRowText>{intl.formatMessage({ id: "OS" })}</AppInfoRowText>
          </AppInfoRow>
        </AppCompatibilityContainer>
      </Section>
      <HorizontalDivider style={{ paddingBottom: "3.5em" }} />
      <ViewFooter>
        <InstallButton appLink="/" />
      </ViewFooter>
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {intl.formatMessage({ id: "modalTitle" })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {intl.formatMessage({ id: "modalText" })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </ViewAppContainer>
  );
};

export default AboutView;
