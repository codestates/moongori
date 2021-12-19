import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
const Wrap = styled.div`
  width: 90%;
  height: 100%;
  .img-align {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-size {
    width: 100%;
    height: 400px;
    @media all and (max-width: 768px) {
      width: 100%;
      height: 400px;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider({ img }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const images = img.split(",");

  return (
    <Wrap>
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div key={index} className={"img-align"}>
              <img src={image} alt={"상품이미지"} className={"img-size"}></img>
            </div>
          );
        })}
      </Slider>
    </Wrap>
  );
}
