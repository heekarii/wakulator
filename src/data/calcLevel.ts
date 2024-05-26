import { levelInfo } from "~/stores/levelInfo";

export const validateInput = (
  articleCount?: number,
  commentCount?: number,
  visitCount?: number,
  date?: string
) => {
  // Validation
  if (
    //=========================================
    // Check if the values are undefined
    //=========================================
    articleCount === undefined ||
    commentCount === undefined ||
    visitCount === undefined ||
    date === undefined ||
    //=========================================
    // Check if the values are negative
    //=========================================
    articleCount! < 0 ||
    commentCount! < 0 ||
    visitCount! < 0 ||
    //=========================================
    // Check if the values are not numbers
    //=========================================
    isNaN(articleCount!) ||
    isNaN(articleCount!) ||
    isNaN(articleCount!) ||
    //=========================================
    // Check if the date is invalid
    //=========================================
    !new Date(date!) ||
    new Date(date!) < new Date("2015-02-25T18:28:00.000Z") ||
    new Date(date!) > new Date()
  ) {
    alert("입력하신 값을 다시 확인해주세요.");
    return;
  }
};

export const calcNextLevelTime = (
  wantedLevel: number,
  articleCount: number,
  commentCount: number,
  visitCount: number,
  date: string
) => {
  const today = new Date();
  const target = new Date(date);
  const difference = today.getTime() - target.getTime();

  const dayDifference = Math.ceil(difference / (1000 * 3600 * 24));
  const weekDifference = Math.ceil(difference / (1000 * 3600 * 24 * 7));

  const wantedLevelInfo = (levelInfo[wantedLevel] || levelInfo[wantedLevel - 2])
    .criteria;

  const articleEstimate =
    (dayDifference * wantedLevelInfo.article) / articleCount;
  const commentEstimate =
    (dayDifference * wantedLevelInfo.comment) / commentCount;
  const visitEstimate = (dayDifference * wantedLevelInfo.visit) / visitCount;
  const weekEstimate =
    weekDifference > 0
      ? (dayDifference * wantedLevelInfo.joinWeek) / weekDifference
      : 0;

  const estimateDay = Math.floor(
    Math.max(articleEstimate, commentEstimate, visitEstimate, weekEstimate) -
      dayDifference
  );
  const estimateDate = new Date(
    today.getTime() + estimateDay * 1000 * 3600 * 24
  );

  return `${estimateDate.getFullYear()}년 ${
    estimateDate.getMonth() + 1
  }월 ${estimateDate.getDate()}일 (${estimateDay}일 후)`;
};
