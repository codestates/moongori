import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faImage } from "@fortawesome/free-solid-svg-icons";
import MapContainer from "../components/MapContainer";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

const StPopupBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const StNewsPostWriteHead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px; // 푸터 내리기
  overflow-y: auto;
`;
const StWriteTitle = styled.div`
  height: 50px;
  width: 60%;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #b7b7b7;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;
const StWriteBox = styled.div`
  height: 800px;
  width: 60%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #b7b7b7;
  border-radius: 15px;
  .select-category {
    margin-bottom: 20px;
    width: 80%;
    margin-top: 10px;
  }
  .addition-wrap {
    margin-right: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: end;
    width: 80%;
    .add-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .write-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .input-area {
      overflow-y: hidden;
      resize: none;
      width: 80%;
      height: 200px;
      border: 1px solid gray;
      outline: none;
      border-radius: 2px;
      line-height: 2.5rem;
      font-size: 15px;
      @media all and (max-width: 1024px) {
        width: 80%;
      }
      @media all and (max-width: 768px) {
        width: 80%;
      }
      @media all and (max-width: 557px) {
        width: 80%;
      }
    }
    .picture-area {
      margin-top: 20px;
      width: 80%;
      display: flex;
      justify-content: start;
    }
  }

  .location-wrap {
    margin-top: 20px;
    width: 80%;
    height: 300px;
    @media all and (max-width: 1024px) {
      width: 80%;
      height: 300px;
    }
    @media all and (max-width: 768px) {
      width: 80%;
      height: 300px;
    }
    @media all and (max-width: 557px) {
      width: 80%;
      height: 250px;
    }
  }
`;

const StuploadIimg = styled.img`
  width: 100px;
  height: 100px;
`;

const StButtonBox = styled.div`
  height: 100px;
  width: 75%;
  display: flex;
  .button-wrap {
    margin-top: 20px;
    width: 90%;
    display: flex;
    justify-content: end;
    .button {
      border-radius: 15px;
      background: #aae8c5;
      border: 1px solid #b7b7b7;
      height: 30px;
      width: 50px;
      margin-right: 10px;
    }
  }
`;
export default function NewsPostWrite({ searchPlace }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [postWrite, setPostWrite] = useState({
    contents: "",
  });
  const [location, setLocation] = useState({
    address: "",
  });
  const [isOpenPopup, setisOpenPopup] = useState(false);
  const handleInputValue = (key) => (e) => {
    setPostWrite({ ...postWrite, [key]: e.target.value });
  };
  //지도 상태
  const [showMap, setShowMap] = useState(false);
  //이미지 상태
  const [showImg, setShowImg] = useState(false);
  //이미지
  const [imgFile, setImgFile] = useState(null); //파일
  //작성 요청 보낼 때 사용
  const contents = postWrite.contents;
  const category = selected.value;
  const locationInfo = location.address;

  const options = useMemo(
    () => [
      { value: "1", label: "취미" },
      { value: "2", label: "일상" },
      { value: "3", label: "맛집" },
      { value: "4", label: "동네소식" },
      { value: "5", label: "사건,사고" },
      { value: "6", label: "분실,실종" },
      { value: "7", label: "질문" },
      { value: "8", label: "반려동물" },
      { value: "9", label: "육아" },
      { value: "10", label: "기타" },
    ],
    []
  );

  const backButton = () => {
    navigate(`/news=0`);
  };
  //지도 찾기
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (data.bname !== "") {
        extraAddr += `, ${data.bname}`;
      }
      fullAddr += extraAddr !== "" ? ` ${extraAddr}` : "";
    }
    setLocation({ ...location, address: fullAddr });

    setisOpenPopup(false);
    setShowMap(true);
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "400px",
    transform: "translate(-50%, -50%)",
    padding: "7px",
  };

  const postThemeStyle = {
    bgColor: "#D6FFEA",
    outlineColor: "#222222",
  };
  const handleChange = (selected) => {
    setSelected(selected);
  };

  const openPopup = () => {
    setisOpenPopup(true);
  };
  const closePopup = () => {
    setisOpenPopup(false);
  };

  //사진 부분
  const [image, setImage] = useState("");

  const photoChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    setImage(imageFile);
    setImgFile(imageUrl); // 파일 상태 업데이트
    setShowImg(!showImg);
  };

  const creatNewsPost = async () => {
    if (selected !== "" && postWrite.contents !== "") {
      const formData = new FormData();
      formData.append("img", image);
      formData.append("content", contents);
      formData.append("category", category);
      formData.append("location", locationInfo);

      const config = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };
      await axios
        .post(`${process.env.REACT_APP_API_URL}/news/post`, formData, config)
        .then((res) => {
          navigate(`/news=${category}`);
        });
    }
  };

  return (
    <>
      <StNewsPostWriteHead>
        <StWriteTitle>게시글 작성</StWriteTitle>
        <StWriteBox>
          <div className={"select-category"}>
            <Select
              options={options}
              value={selected}
              onChange={handleChange}
              defaultMenuIsOpen
            />
          </div>
          <div className={"addition-wrap"}>
            <div>
              <label for="input-file" className={"add-icon"}>
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                type="file"
                name="file"
                id="input-file"
                accept="image/*"
                onChange={photoChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              className={"location-button"}
              onClick={() => {
                openPopup();
              }}
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </div>
            {isOpenPopup && (
              <StPopupBackground
                onClick={() => {
                  closePopup();
                }}
              >
                <DaumPostcode
                  style={postCodeStyle}
                  theme={postThemeStyle}
                  autoClose
                  onComplete={onCompletePost}
                />
              </StPopupBackground>
            )}
          </div>
          <div className={"write-wrap"}>
            <textarea
              className={"input-area"}
              onChange={handleInputValue("contents")}
            ></textarea>
            {showImg ? (
              <div className={"picture-area"}>
                {/* <div className={"add-img"}></div> */}
                <StuploadIimg
                  src={imgFile}
                  alt={"게시글 이미지"}
                ></StuploadIimg>
              </div>
            ) : null}
          </div>
          {showMap ? (
            <div className={"location-wrap"}>
              <MapContainer locationInfo={locationInfo} />
            </div>
          ) : null}
        </StWriteBox>
        <StButtonBox>
          <div className={"button-wrap"}>
            <button
              className={"button"}
              onClick={() => {
                backButton();
              }}
            >
              취소
            </button>
            <button
              className={"button"}
              onClick={() => {
                creatNewsPost();
              }}
            >
              등록
            </button>
          </div>
        </StButtonBox>
      </StNewsPostWriteHead>
    </>
  );
}
