'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("newsPosts", [
      {
        id: 1,
        user_Id: 1,
        category: 1,
        view: 15,
        content: "여기 맛집입니다.",
        img: "",
        location: "송파구,방이동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_Id: 1,
        category: 1,
        view: 15,
        content: "얼큰한 짬뽕맛집",
        img: "",
        location: "송파구,잠실본동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_Id: 1,
        category: 2,
        view: 15,
        content: "축구 하실분",
        img: "",
        location: "송파구,방이동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_Id: 3,
        category: 3,
        view: 20,
        content: "등산가실분",
        img: "",
        location: "송파구,천호동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        user_Id: 1,
        category: 2,
        view: 10,
        content: "친구만드실분",
        img: "",
        location: "동대문구,제기동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        user_Id: 1,
        category: 1,
        view: 30,
        content: "칼국수 맛집입니다.",
        img: "",
        location: "동작구,사당1동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        user_Id: 1,
        category: 3,
        view: 10,
        content: "샤로수길 같이가요",
        img: "",
        location: "관악구,봉천동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        user_Id: 1,
        category: 2,
        view: 30,
        content: "대림무서워요.",
        img: "",
        location: "동작구,사당1동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        user_Id: 1,
        category: 2,
        view: 6,
        content: "꿔바로우맛집",
        img: "",
        location: "동작구,사당1동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        user_Id: 1,
        category: 2,
        view: 23,
        content: "가을단풍이 이뻐요",
        img: "",
        location: "동작구,사당1동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        user_Id: 3,
        category: 2,
        view: 30,
        content: "오징어 덮밥 맛있당",
        img: "",
        location: "동작구,사당2동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        user_Id: 2,
        category: 3,
        view: 25,
        content: "골프치실분",
        img: "",
        location: "동작구,사당2동",
        latitude: 23.12345,
        longitude: 26.12356,
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("newsPosts", null, {});
  }
};
