import { CafeMemberLevelInfo } from "~/types/cafeMemberLevelInfo"

export const levelInfo = [
  {
    id: "0",
    name: "미개",
    description: "가입 후 막 활동을 시작해 어떻게 해야 할 줄 모르는 미개한 상태",
    criteria: {
      article: 0,
      comment: 0,
      visit: 0,
      joinWeek: 0,
    },
  },
  {
    id: "1_110",
    name: "노비",
    description: "아직 미개하나 주어진 활동을 반복적으로 해 나가는 상태",
    criteria: {
      article: 0,
      comment: 1,
      visit: 3,
      joinWeek: 0,
    },
  },
  {
    id: "1_120",
    name: "갓수",
    description: "카페에 통달하여 자유함을 얻은 상태나 미개함이 노비와 같은 상태",
    criteria: {
      article: 50,
      comment: 250,
      visit: 250,
      joinWeek: 4,
    },
  },
  {
    id: "1_130",
    name: "핫산",
    description: "많은 활동을 하였으나 회원들이 날 보는 시선이 곱지많은 않다",
    criteria: {
      article: 100,
      comment: 500,
      visit: 500,
      joinWeek: 4,
    },
  },
  {
    id: "1_140",
    name: "왁창",
    description: "카페를 탈퇴할지 계속 활동할지 고민하는 단계 (노력으로 올 수 있는 단계)",
    criteria: {
      article: 300,
      comment: 1000,
      visit: 1000,
      joinWeek: 12,
    },
  },
  {
    id: "1_150",
    name: "노숙자",
    description: "카페에서 노숙 활동을 이어가고 있는 사람이다.",
    criteria: {
      article: 1000,
      comment: 5000,
      visit: 5000,
      joinWeek: 24,
    },
  },
] as CafeMemberLevelInfo[]
