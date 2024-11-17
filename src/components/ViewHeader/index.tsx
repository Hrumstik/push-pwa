import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  HeaderInfoContainer,
  HeaderInfoText,
  HeaderInfoTitle,
  LogoSection,
  ViewHeaderContainer,
} from "../styles";
import { useIntl } from "react-intl";
import { Dispatch, SetStateAction } from "react";
import useSanity from "../../shared/hooks/useSanity";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
  id: string;
}

const ViewHeader: React.FC<Props> = ({ setView, id }) => {
  const { data, urlFor } = useSanity(`appIcon`);
  const intl = useIntl();

  const handleClick = () => {
    setView("main");
  };
  if (!data) return null;
  return (
    <ViewHeaderContainer>
      <IconButton size="large" onClick={handleClick}>
        <ArrowBackIcon sx={{ color: "rgb(32, 33, 36)", fontSize: 24 }} />
      </IconButton>
      <LogoSection src={urlFor(data!.appIcon)} />
      <HeaderInfoContainer>
        <HeaderInfoTitle>{intl.formatMessage({ id: "name" })}</HeaderInfoTitle>
        <HeaderInfoText>{intl.formatMessage({ id })}</HeaderInfoText>
      </HeaderInfoContainer>
    </ViewHeaderContainer>
  );
};

export default ViewHeader;
