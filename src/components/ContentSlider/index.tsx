import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScreenContainer, ScreenWrapperItem, SliderContainer } from "../styles";
import useSanity from "../../shared/hooks/useSanity";

export default function ContentSlider() {
  const { data, urlFor } = useSanity("screens");

  if (!data) return null;

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <SliderContainer>
      <div className="slider-container">
        <Slider {...settings}>
          {data?.screens.map((screen, index) => {
            return (
              <ScreenWrapperItem key={index}>
                <ScreenContainer>
                  <img
                    src={urlFor(screen)}
                    width={360}
                    height={720}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                    alt="Screen"
                  />
                </ScreenContainer>
              </ScreenWrapperItem>
            );
          })}
        </Slider>
      </div>
    </SliderContainer>
  );
}
