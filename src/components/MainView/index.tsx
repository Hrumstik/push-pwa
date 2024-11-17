import { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";
import AppLogo from "../AppLogo";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import {
  MainContainer,
  AppDescriptionSection,
  AppNameContainer,
  AppHeader,
  AppHeaderInfoContainer,
  AppStatisticsCard,
  AppStatisticsCardItem,
  VerticalDivider,
  AppStatisticsCardItemTitle,
  AppStatisticsCardItemContent,
  AgeLogoContainer,
  AboutGameContainer,
  ShortDescriptionWrapper,
  AppRateContainer,
  AppRatesAndSection,
  AppRatesAndReviewsContainer,
  AppStarsContainer,
  AppRatesCountContainer,
  AppRatingContainer,
  RatingContainer,
  StarsCount,
  RatingChart,
  ReviewsSection,
  AgeImg,
  colors,
} from "../styles";
import InstallButton from "../InstallButton";
import ContentSlider from "../ContentSlider";
import OpenSectionButton from "../OpenSectionButton";
import ChipSlider from "../ChipSlider";
import Review from "../Review";
import InstallationProgess from "../InstallationProgress";
import RateApp from "../RateApp";
import useSanity from "../../shared/hooks/useSanity";
import { checkLocale } from "../../shared/helpers/languages";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
  pixelId?: null | string;
  fbc?: string | null;
  fbp?: string | null;
  host?: string | null;
}

const ratingsData = [
  { stars: 5, rating: 70 },
  { stars: 4, rating: 15 },
  { stars: 3, rating: 10 },
  { stars: 2, rating: 1 },
  { stars: 1, rating: 3 },
];

const MainView: React.FC<Props> = ({ setView }) => {
  const intl = useIntl();
  const { data, urlFor } = useSanity(
    `appName, rating, countOfReviews, countOfDownloads, countOfReviewsFull, countOfStars, reviews, shortDescription`
  );

  if (!data) return null;

  const reviews =
    data.reviews.length > 3 ? data.reviews.slice(0, 3) : data.reviews;

  return (
    <MainContainer>
      <AppDescriptionSection>
        <AppHeader>
          <AppLogo />
          <AppHeaderInfoContainer>
            <AppNameContainer>
              {data?.appName ? data.appName : "Nine Casino"}
            </AppNameContainer>
            <InstallationProgess />
          </AppHeaderInfoContainer>
        </AppHeader>
        <AppStatisticsCard>
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              {data?.rating}
              <StarIcon fontSize="inherit" />
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {data?.countOfReviews ? data.countOfReviews : "21K"}

              {intl.formatMessage({
                id: "reviews",
                defaultMessage: "reviews",
              })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
          <VerticalDivider orientation="vertical" variant="inset" flexItem />
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              {data?.countOfDownloads}
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({
                id: "downloads",
                defaultMessage: "Donwloads",
              })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
          <VerticalDivider orientation="vertical" variant="inset" flexItem />
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              <AgeLogoContainer>
                <AgeImg src="/18.png" alt="Age icon" />
              </AgeLogoContainer>
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "age", defaultMessage: "Age" })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
        </AppStatisticsCard>
        <InstallButton appLink="/" />
        <ContentSlider />
        <AboutGameContainer>
          <OpenSectionButton
            id="about"
            defaultMessage="About this game"
            view="about"
            setView={setView}
          />
        </AboutGameContainer>
        <ShortDescriptionWrapper>
          {data?.shortDescription[checkLocale()]}
        </ShortDescriptionWrapper>
        <ChipSlider />
        <AboutGameContainer>
          <OpenSectionButton
            id="ratingsAndReviews"
            defaultMessage="Ratings and reviews"
            view="reviews"
            setView={setView}
          />
        </AboutGameContainer>
      </AppDescriptionSection>

      <AppRatesAndSection>
        <AppRatesAndReviewsContainer>
          <AppRateContainer> {data?.rating}</AppRateContainer>
          <AppStarsContainer>
            <Rating
              name="half-rating-read"
              defaultValue={data.countOfStars}
              precision={0.1}
              readOnly
              sx={{ color: colors.buttonBackground, fontSize: "14px" }}
            />
          </AppStarsContainer>
          <AppRatesCountContainer>
            {data?.countOfReviewsFull}
          </AppRatesCountContainer>
          <AppRatingContainer>
            {ratingsData.map((data, index) => (
              <RatingContainer key={index}>
                <StarsCount>{data.stars}</StarsCount>
                <RatingChart rating={data.rating} />
              </RatingContainer>
            ))}
          </AppRatingContainer>
        </AppRatesAndReviewsContainer>
        <RateApp />
      </AppRatesAndSection>
      <ReviewsSection>
        {reviews.map((review) => {
          const parts = review.reviewDate.split("-");
          const formattedDate = `${parts[2]}/${parts[1]}/${parts[0].slice(-2)}`;
          return (
            <Review
              src={
                review.reviewAuthorIcon
                  ? urlFor(review.reviewAuthorIcon)
                  : undefined
              }
              key={review.reviewAuthorName}
              name={review.reviewAuthorName}
              avatarName={review.avatarTitle}
              color={review.reviewIconColor}
              stars={review.reviewAuthorRating}
              text={review.reviewText[checkLocale()]}
              date={formattedDate}
            />
          );
        })}
      </ReviewsSection>
    </MainContainer>
  );
};

export default MainView;
