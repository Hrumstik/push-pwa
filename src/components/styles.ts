/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import { Divider as MuiDivider, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const colors = {
  mainText: "rgb(32, 33, 36)",
  primary: "rgb(11, 87, 207)",
  secondaryText: "rgb(95, 99, 104)",
  background: "#e3e3e3",
  buttonBackground: "rgb(0, 135, 95);",
  disabledText: "rgba(0, 0, 0, 0.26)",
  separator: "#dadce0",
};

export const MainContainer = styled.main`
  min-height: 100vh;
  background-color: white;
  // @media (max-width: 480px) {
  padding-top: 20px;
  // }
`;

export const AppDescriptionSection = styled.section`
  // @media (max-width: 480px) {
  margin-left: 24px;
  margin-right: 24px;
  overflow: visible;
  // }
`;

export const AppHeader = styled.header`
  display: flex;
  margin-bottom: 16px;
`;

export const LogoContainer = styled.div`
  position: relative;
  display: block;
  overflow: hidden;

  // @media (max-width: 480px) {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 20px;
  // }
`;

export const LogoInProgressWrapper = styled.div`
  // @media (max-width: 480px) {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin-right: 20px;
  // }
`;

export const LogoInProgressContainer = styled.div`
  // @media (max-width: 480px) {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  // }
`;

export const AppHeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppNameContainer = styled.div`
  font-family: "Roboto", sans-serif;
  max-width: 240px;
  font-size: 22px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.mainText};
`;

export const AppDeveloperСompanyName = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  cursor: pointer;
`;

export const DeveloperNameSpan = styled.span`
  font-family: "Roboto", sans-serif;
  display: inline-block;
  white-space: nowrap;
  font-size: 13px;
  color: #047a56;
  font-weight: 700;
  margin-right: 15px;
`;

export const AppStatisticsCard = styled.div`
  display: flex;
  align-items: center;
  // @media (max-width: 480px) {
  margin-bottom: 24px;
  // }
`;

export const AppStatisticsCardItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 44px;
`;

export const VerticalDivider = styled(MuiDivider)`
  margin-left: 0;
`;

export const AppStatisticsCardItemTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #030303;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const AppStatisticsCardItemContent = styled.div`
  // @media (max-width: 480px) {
  color: ${colors.secondaryText};
  font-family: system-ui;
  font-weight: 500;
  line-height: 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.025em;
  // }
`;

export const AgeLogoContainer = styled.div`
  position: relative;
  display: block;
  overflow: hidden;

  // @media (max-width: 480px) {
  width: 16px;
  height: 16px;
  // }
`;

export const CustomButton = styled(Button)({
  // "@media (max-width: 480px)": {
  backgroundColor: colors.buttonBackground,
  borderRadius: "20px",
  border: "none",
  color: "white",
  fontFamily: "system-ui",
  fontWeight: `500`,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: colors.primary,
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: colors.primary,
  },
  marginBottom: "24px",
  // },
});

export const CustomLoadingButton = styled(LoadingButton)({
  // "@media (max-width: 480px)": {
  backgroundColor: colors.buttonBackground,
  borderRadius: "20px",
  border: "none",
  color: "white",
  marginBottom: "24px",
  // },
});

export const DisabledOpenButton = styled(Button)({
  // "@media (max-width: 480px)": {
  backgroundColor: colors.background,
  borderRadius: "20px",
  border: "none",
  color: colors.disabledText,
  fontFamily: "system-ui",
  fontWeight: `500`,
  textTransform: "none",
  boxShadow: "none",
  // },
});

export const CancelButton = styled(Button)({
  // "@media (max-width: 480px)": {
  backgroundColor: "white",
  borderRadius: "20px",
  border: `1px solid ${colors.mainText}`,
  color: colors.primary,
  fontFamily: "system-ui",
  fontWeight: `500`,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: colors.background,
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: colors.background,
  },
  // },
});

export const ScreenWrapperItem = styled.div`
  box-sizing: border-box;
  padding-right: 12px;
`;

export const ScreenContainer = styled.div`
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 8px;
  @media (max-width: 480px) {
    max-width: 480px;
    width: 100%;
  }
`;

export const SliderContainer = styled.div`
  // @media (max-width: 480px) {
  margin-bottom: 16px;
  // }
`;

export const AboutGameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // @media (max-width: 480px) {
  margin-bottom: 16px;
  // }
`;

export const ButtonTitle = styled.div`
  color: #636b6f;
  font-family: "Roboto", sans-serif;
  // @media (max-width: 480px) {
  text-align: left;
  font-family: system-ui;
  font-weight: 500;
  text-transform: none;
  line-height: 1.25rem;
  font-size: 16px;
  color: #636b6f;
  // }
`;

export const ShortDescriptionWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: left;
  font-size: 14px;
  line-height: 24px;
  color: #333;
  margin-bottom: 12px;
`;

export const AppRatesAndSection = styled.section`
  // @media (max-width: 480px) {
  margin-left: 24px;
  margin-right: 24px;
  overflow: visible;
  // }
`;

export const AppRatesAndReviewsContainer = styled.div`
  // @media (max-width: 480px) {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "rating-big rating-right"
    "rating-stars rating-right"
    "rating-count rating-right";
  grid-column-gap: 2em;
  // }
`;

export const AppRateContainer = styled.div`
  font-family: system-ui;
  grid-area: rating-big;
  font-size: 3em;
  color: ${colors.mainText};
`;

export const AppStarsContainer = styled.div`
  grid-area: rating-stars;
  display: flex;
  margin-bottom: 8px;
`;

export const AppRatesCountContainer = styled.div`
  grid-area: rating-count;
  font-family: system-ui;
  font-weight: 500;
  font-size: 0.8em;
`;

export const AppRatingContainer = styled.div`
  grid-area: rating-right;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 0.75em;
  justify-content: center;
  align-items: center;
`;

export const StarsCount = styled.div`
  font-family: system-ui;
  font-weight: 500;
  font-size: 0.8em;
  width: 0.5em;
`;

export const RatingChart = styled.div<any>`
  height: 0.5em;
  width: 100%;
  background: #d9d9d9;
  border-radius: 0.5em;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 0.5em;
    min-width: 0.5em;
    background: #00875f;
    border-radius: 0.5em;
    width: ${(props) => props.rating || 0}%;
  }
`;

export const ReviewsSection = styled.section`
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const ReviewWrapper = styled.div`
  display: block;
`;

export const ReviewContainer = styled.div`
  // @media (max-width: 480px) {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  width: 100%;
  // }
`;

export const ReviewHeader = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  gap: 1em;
  align-items: center;
`;

export const ReviewAuthorContainer = styled.div`
font-family: Roboto;
  font-weight: 400;
  color: ${colors.mainText}
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const ReviewDataContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

export const ReviewDate = styled.div`
  font-family: system-ui;
  font-weight: 400;
  color: ${colors.secondaryText};
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const ReviewText = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: ${colors.secondaryText};
  text-overflow: ellipsis;
  text-align: justify;
  font-size: 0.875rem;
  letter-spacing: 0.0142857143em;
  line-height: 1.25rem;
  overflow-wrap: anywhere;
`;

export const AgeImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const AppImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
`;

export const ViewHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 3.5em;
  background-color: #fff;

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background: ${colors.separator};
    position: absolute;
    bottom: 0;
  }
`;

export const ViewAppContainer = styled.div`
  min-height: 100vh;
`;

export const LogoSection = styled.img`
  height: calc(100% - 1.5em);
  margin-right: 1.25em;
  border-radius: 0.5em;
  aspect-ratio: 1/1;
`;

export const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeaderInfoTitle = styled.span`
  font-family: "Roboto", sans-serif;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.mainText};
  font-family: system-ui;
  font-weight: 500;
  line-height: 1.3rem;
  font-size: 16px;
`;

export const MainContentSection = styled.section`
  padding-top: 3.5em;
  margin-left: 24px;
  margin-right: 24px;
`;

export const HeaderInfoText = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  color: ${colors.secondaryText};
`;

export const AboutAppSectionTitle = styled.div`
  font-size: 1.1rem;
  color: ${colors.mainText};
  font-family: system-ui;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const AppCompatibilityTitle = styled.div`
  font-size: 1.1rem;
  color: ${colors.mainText};
  font-family: system-ui;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AboutGameTextContainer = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  color: ${colors.mainText};
  font-family: system-ui;
  padding-bottom: 16px;
  white-space: pre-wrap;
  position: relative;
`;

export const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.separator};
`;

export const Section = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

export const AppInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em 0;
}
`;

export const AppCompatibilityContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em 0;
}
`;

export const AppInfoTitle = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  color: ${colors.mainText};
  font-family: system-ui;
  padding-top: 16px;
`;

export const AppInfoRow = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AppInfoRowText = styled.span`
  font-family: "Roboto", sans-serif;
  font-family: system-ui;
  font-size: 0.9rem;
`;

export const InstallationProgessWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-family: system-ui;
`;

export const PercentagesMessage = styled.div`
  font-family: system-ui;
  font-weight: 500;
  line-height: 1.25rem;
  font-size: 0.875rem;
  color: ${colors.mainText};
`;

export const VerifiedConteiner = styled.div`
  font-family: system-ui;
  font-weight: 400;
  line-height: 0.8rem;
  font-size: 0.675rem;
  color: ${colors.secondaryText};
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const RatingsAndReviewsWrapper = styled.div`
  padding-top: 3.5em;
  margin-left: 24px;
  margin-right: 24px;
`;

export const RatingsAndReviewsSection = styled.section`
  margin-top: 24px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const RateTitle = styled.div`
  // @media (max-width: 480px) {
  text-align: left;
  font-family: system-ui;
  font-weight: 500;
  text-transform: none;
  line-height: 1.25rem;
  font-size: 1rem;
  color: ${colors.mainText};
  // }
`;

export const RatingText = styled.div`
  font-family: system-ui;
  font-weight: 400;
  color: ${colors.secondaryText};
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const RateAppHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RateStarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WriteReview = styled.div`
  font-family: system-ui;
  font-weight: 500;
  // @media (max-width: 480px) {
  line-height: 1.25rem;
  font-size: 0.875rem;
  color: green;
  // }
`;

export const AppStatisticsContentIcon = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #898989;
  margin-top: 5px;
`;

export const AgeDiv = styled.div`
  border: 1px solid #000;
  font-size: 13px;
  padding: 0 2px;
`;

export const ViewFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  height: 3.2em;
  padding-top: 24px;
  background-color: #fff;
`;

export const InstallWrapper = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`;
