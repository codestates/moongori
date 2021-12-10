import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

const StBodyDiv = styled.div`
  width: 100%;
  min-height: 100%;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .wrap {
    margin-top: 40px;
    width: 60%;
    max-width: 1200px;
    .info {
      border-top: 1px solid;
      border-bottom: 1px solid;
      padding: 20px 0 20px 0;
    }
    .suggestion {
      margin-top: 30px;
    }
    .button {
      text-align: right;
      button {
        margin: 5px 10px 0 0;
        width: 50px;
        height: 30px;
        background: #aae8c5;
        border: 1px solid #b7b7b7;
        border-radius: 15px;
      }
    }
  }
`;

const StContentsHeadDiv = styled.div`
  border-bottom: 1px solid #b8b8b8;
  display: flex;
  justify-content: space-between;
  .goodsInfo-text {
    font-size: 1.8em;
  }
`;

const StContentsDiv = styled.div`
  display: flex;
  border-bottom: ${(props) => (props.suggestion ? null : "1px solid #b8b8b8")};
  padding: ${(props) =>
    props.suggestion ? "20px 0 0 10px" : "20px 0 20px 10px"};
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
    margin-right: 40px;
    font-size: 0.9em;
    font-weight: bold;
    bottom: 0px;
  }
  input {
    width: 60%;
    height: 30px;
    font-size: 1em;
    outline-color: #92e3a9;
  }
  textarea {
    width: 60%;
    height: 200px;
    resize: none;
    font-size: 1.2em;
  }
  label {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    .image-upload {
      width: 100px;
      height: 100px;
      background: #c4c4c4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 3em;
      }
    }
  }
  .calendar {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .calendar-icon {
      margin-right: 5px;
      font-size: 20px;
    }
    .warning-text {
      font-size: 0.8em;
      color: #f11111;
    }
    .react-datepicker-wrapper {
      font-size: 0.8em;
      width: 40%;
    }
  }
`;

const StPreviewDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
  }
`;

export default function TradePostWrite() {
  const navigate = useNavigate();
  const [normalOrNot, setNormalOrNot] = useState(0);
  const [imgFiles, setImgFiles] = useState([]); // 서버에 보내는 이미지 파일
  const [images, setImages] = useState([]); // 화면에 표현해주는 이미지
  const [startDate, setStartDate] = useState(new Date());
  console.log("startDate;;", startDate);
  // 일반, 제시 변경하는 경우
  const handleNormalOrNot = (e) => {
    setNormalOrNot(Number(e.target.value));
  };

  // 사진 업로드하는 경우
  const handleUploadImg = (e) => {
    // console.log(e.target.files);
    if (imgFiles.length + e.target.files.length <= 5) {
      const file = [];
      const imgUrl = [];
      let count = 0;
      for (let key in e.target.files) {
        if (count === e.target.files.length) break;
        file.push(e.target.files[key]);
        imgUrl.push(URL.createObjectURL(e.target.files[key]));
        count++;
      }
      console.log(file, imgUrl);
      setImgFiles([...imgFiles, ...file]);
      setImages([...images, ...imgUrl]);
    } else {
      Swal.fire({
        icon: "error",
        title: "상품이미지는 최대5까지 가능합니다.",
      });
    }
  };

  // 업로드할 사진 삭제하는 경우
  const handelDeleteImg = (index) => {
    console.log(index);
    const copyImages = images.slice();
    const copyImgFiles = imgFiles.slice();
    copyImgFiles.splice(index, 1);
    copyImages.splice(index, 1);
    setImgFiles(copyImgFiles);
    setImages(copyImages);
  };

  // 취소 버튼 누른 경우
  const handleCancle = () => {
    navigate("/trade=all");
  };

  // 완료 버튼 누른 경우
  const handleRegister = () => {
    const formData = new FormData();
  };

  return (
    <StBodyDiv>
      <div className={"wrap"}>
        <StContentsHeadDiv>
          <div className={"goodsInfo-text"}>상품 정보</div>
          <div>
            일반
            <input
              type={"radio"}
              name={"normalOrNot"}
              value={"0"}
              checked={normalOrNot === 0}
              onClick={(e) => handleNormalOrNot(e)}
            />
            제시
            <input
              type={"radio"}
              name={"normalOrNot"}
              value={"1"}
              checked={normalOrNot === 1}
              onClick={(e) => handleNormalOrNot(e)}
            />
          </div>
        </StContentsHeadDiv>
        <div className={"info"}>
          <StContentsDiv>
            <div className={"name"}>제목</div>
            <input type={"text"} />
          </StContentsDiv>
          <StContentsDiv>
            <div className={"name"}>가격</div>
            <input type={"text"} />
          </StContentsDiv>
          <StContentsDiv>
            <div className={"name"}>상품 이미지</div>
            <div>
              <label for="uploadImg">
                <div className={"image-upload"}>
                  <FontAwesomeIcon icon={faCamera} />
                  <div>{`${imgFiles.length} / 5`}</div>
                </div>
              </label>
              <input
                type="file"
                name="file"
                multiple
                id="uploadImg"
                accept="image/*"
                onChange={(e) => handleUploadImg(e)}
                style={{ display: "none" }}
              />
              <StPreviewDiv>
                {images.map((image, index) => {
                  return (
                    <div>
                      <FontAwesomeIcon
                        icon={faMinusSquare}
                        pull={"left"}
                        onClick={() => handelDeleteImg(index)}
                      />
                      <img src={image} alt={"미리보기 이미지"} />
                    </div>
                  );
                })}
              </StPreviewDiv>
            </div>
          </StContentsDiv>
          <div className={"suggestion"}>
            {normalOrNot ? (
              <StContentsDiv suggestion>
                <div className={"name"}>기간</div>
                <div className={"calendar"}>
                  <FontAwesomeIcon
                    className={"calendar-icon"}
                    icon={faCalendar}
                  />
                  <DatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <div className={"warning-text"}>최대 7일까지 가능합니다.</div>
                </div>
              </StContentsDiv>
            ) : null}
            <StContentsDiv suggestion>
              <div className={"name"}>설명</div>
              <textarea type={"text"} required />
            </StContentsDiv>
          </div>
        </div>
        <div className={"button"}>
          <button onClick={handleCancle}>취소</button>
          <button onClick={handleRegister}>등록</button>
        </div>
      </div>
    </StBodyDiv>
  );
}
