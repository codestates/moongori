import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import vegetable from "../images/vegetable.jpeg";
import dummyMac from "../images/dummyMac.png";
const Wrap = styled.div`
    
    width:90%;
    height:100%;
    .img-align{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .img-size{
        width:100%;
        height:400px;
    }
    .slick-prev:before,
    .slick-next:before {
          color: black;
          
        }
`
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
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
        ...style, display: "block",
      }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };
  return (
    <Wrap>
      <Slider {...settings}>
        <div className={"img-align"}>
          <img src={vegetable} className={"img-size"}></img>
        </div>
        <div>
          <img src={dummyMac} className={"img-size"}></img>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </Wrap>
  );
}
