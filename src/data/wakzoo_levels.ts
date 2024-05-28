import { CafeMemberLevelInfo } from "~/types/cafeMemberLevelInfo"

export const levelInfo = [
  {
    id: "0",
    name: "아메바",
    description: "아메바와 같은 상태",
    criteria: {
      article: 0,
      comment: 0,
      visit: 0,
      joinWeek: 0,
    },
  },
  {
    id: "1_110",
    name: "진드기",
    description: "활동은 하지 않으며 남의 게시글만 보고 맛보고 뜯는 단계이다",
    criteria: {
      article: 0,
      comment: 1,
      visit: 3,
      joinWeek: 0,
    },
  },
  {
    id: "1_120",
    name: "닭둘기",
    description: "더욱 열심히 온갖 쓰레기를 다 먹고 다니는 단계",
    criteria: {
      article: 50,
      comment: 250,
      visit: 250,
      joinWeek: 4,
    },
  },
  {
    id: "1_130",
    name: "왁무새",
    description: "이제 훌륭한 동물이 되었으나 가끔씩 다른 무새로 변할 때가 있다.",
    criteria: {
      article: 300,
      comment: 700,
      visit: 500,
      joinWeek: 12,
    },
  },
  {
    id: "1_140",
    name: "침팬치",
    description: "입을 다물고 있으면 언뜻 사람같지만 쉽게 흥분한다.",
    criteria: {
      article: 700,
      comment: 1500,
      visit: 1000,
      joinWeek: 16,
    },
  },
  {
    id: "1_150",
    name: "느그자",
    description: "백수의 왕이다.",
    criteria: {
      article: 1000,
      comment: 5000,
      visit: 5000,
      joinWeek: 30,
    },
  },
] as CafeMemberLevelInfo[]
