import { Dispatch, SetStateAction } from "react";
import {
  HorizontalDivider,
  RatingsAndReviewsSection,
  RatingsAndReviewsWrapper,
  ViewAppContainer,
  ViewFooter,
} from "../styles";
import ViewHeader from "../ViewHeader";
import Review from "../Review";
import InstallButton from "../InstallButton";
import useSanity from "../../shared/hooks/useSanity";
import { checkLocale } from "../../shared/helpers/languages";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
}

const ReviewsView: React.FC<Props> = ({ setView }) => {
  const { data, urlFor } = useSanity("reviews");

  if (!data) return null;

  return (
    <ViewAppContainer>
      <ViewHeader id="ratingsAndReviews" setView={setView} />
      <RatingsAndReviewsWrapper>
        <RatingsAndReviewsSection>
          {data.reviews.map((review) => {
            const parts = review.reviewDate.split("-");
            const formattedDate = `${parts[2]}/${parts[1]}/${parts[0].slice(
              -2
            )}`;
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
        </RatingsAndReviewsSection>
      </RatingsAndReviewsWrapper>
      <HorizontalDivider style={{ paddingBottom: "3.5em" }} />
      <ViewFooter>
        <InstallButton appLink="/" />
      </ViewFooter>
    </ViewAppContainer>
  );
};

export default ReviewsView;
