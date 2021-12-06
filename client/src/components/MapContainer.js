/*global kakao*/

import React, { useEffect } from "react";
import styled from "styled-components";
import markericon from "../images/moongorimarker.png";
const StMapstyle = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.showMap === true ? "block" : "none")};
  .custom {
    font-size: 12px;
  }
`;

const { kakao } = window;

const MapContainer = ({ locationInfo, showMap }) => {
  console.log(locationInfo);
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    // let marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.537187, 127.005476),
    // });
    // var iwContent = `<div style="border-radius:10px;"> <div style="padding:5px; font-weight:bold;">
    //       문고리
    //     </div></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //   iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // // 인포윈도우를 생성합니다
    // var infowindow = new kakao.maps.InfoWindow({
    //   position: iwPosition,
    //   content: iwContent,
    // });
    geocoder.addressSearch(locationInfo, function (results, status) {
      //정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0]; //첫번째 결과의 값을 활용

        //해당 주소에 대한 좌표를 받아서
        const coords = new kakao.maps.LatLng(result.y, result.x);
        //지도를 보여준다

        const imageSrc = "../images/moongorimarker.png"; // 마커 이미지 주소
        const imageSize = new window.kakao.maps.Size(60, 72); // 마커 이미지 크기
        const imageOption = {
          offset: new window.kakao.maps.Point(20, 69), // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        };

        const markerImage = new window.window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        // 결과값으로 받은 위치를 마커로 표시
        let marker = new window.kakao.maps.Marker({
          image: markerImage,
          position: coords,
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
        // 카카오맵에서 검색되도록 주소에서 공백을 지워줌
        const searchAddress = locationInfo?.replace(/ /g, "");
        var content = `<a style="text-decoration: none;" href=https://map.kakao.com/link/search/${searchAddress} target="_blank">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #fff; border: 1px solid #e0dde1; border-radius: 0.313rem; width: 100%; height: 100%; padding: 10px; margin-bottom: 200px; cursor: pointer;">
          <span style="color: #2d2d2d; font-weight: 300; font-size: 1rem; margin-bottom: 5px;">문고리</span>
          <span style="color: #2d2d2d; font-weight: 100; font-size: 0.9rem;">${locationInfo}</span>
          </div>
          </a>`;
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          content: content,
          map: map,
        });
        // 커스텀 오버레이를 지도에 표시
        customOverlay.setMap(map);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
        // map.relayout();
        // // 지도 중심을 변경한다.
        // map.setCenter(coords);
        // // 마커를 결과값으로 받은 위치로 옮긴다.
        // marker.setPosition(coords);

        // infowindow.open(map, marker);
      }
    });
  }, [locationInfo]);

  return <StMapstyle id="myMap" showMap={showMap}></StMapstyle>;
};

export default MapContainer;
