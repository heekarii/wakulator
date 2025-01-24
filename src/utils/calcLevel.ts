import { levelInfo } from "~/data/wakzoo_levels"
import { setToast } from "~/stores/toastMessage"

export class InvalidInputError extends Error {
  constructor() {
    super("입력하신 값을 다시 확인해주세요.")
    this.name = "InvalidInputError"
  }
}

export const validateInput = (articleCount?: number, commentCount?: number, visitCount?: number, date?: string) => {
  // Validation
  if (
    // Check if the values are undefined
    articleCount === undefined ||
    commentCount === undefined ||
    visitCount === undefined ||
    date === undefined ||
    // Check if the values are negative
    articleCount < 0 ||
    commentCount < 0 ||
    visitCount < 0 ||
    // Check if the values are not numbers
    isNaN(articleCount) ||
    isNaN(commentCount) ||
    isNaN(visitCount) ||
    // Check if the date is invalid
    !new Date(date) ||
    new Date(date) < new Date("2015-02-25T18:28:00.000Z") ||
    new Date(date) > new Date()
  ) {
    setToast({ message: "입력하신 값을 다시 확인해주세요." })
    return false
  }

  return true
}

const _calcDifference = (target: Date) => {
  const today = new Date()

  const dayDifference = ((today.getTime() - target.getTime()) / (1000 * 3600 * 24)) | 0
  const weekDifference = (dayDifference / 7) | 0

  return {
    now: today,
    day: dayDifference,
    week: weekDifference,
  }
}

function checkEasterEgg(input: { article: number; comment: number; visit: number; date: string }) {
  if (input.article === 158 && input.comment === 158 && input.visit === 158 && input.date === "2021-08-28") {
    return {
      id: "158",
      name: "아이네",
      index: 6,
      criteria: {
        article: 50,
        comment: 250,
        visit: 250,
        joinWeek: 4,
      },
    }
  }

  if (input.article === 700 && input.comment === 700 && input.visit === 700 && input.date === "2022-05-10") {
    return {
      id: "700",
      name: "전투메이드",
      index: 7,
      criteria: {
        article: 700,
        comment: 1500,
        visit: 1000,
        joinWeek: 16,
      },
    }
  }

  if (input.article === 1008 && input.comment === 1008 && input.visit === 1008 && input.date === "2023-04-30") {
    return {
      id: "1008",
      name: "징버거",
      index: 8,
      criteria: {
        article: 700,
        comment: 1500,
        visit: 1000,
        joinWeek: 16,
      },
    }
  }

  if (input.article === 116 && input.comment === 116 && input.visit === 116 && input.date === "2022-03-01") {
    return {
      id: "116",
      name: "망냥냥",
      index: 9,
      criteria: {
        article: 50,
        comment: 250,
        visit: 250,
        joinWeek: 4,
      },
    }
  }

  return null
}

function calculateProgress(input: any, nextLevel: any) {
  return {
    article: nextLevel.criteria.article !== 0 ? (input.article / nextLevel.criteria.article) * 100 : 100,
    comment: nextLevel.criteria.comment !== 0 ? (input.comment / nextLevel.criteria.comment) * 100 : 100,
    visit: nextLevel.criteria.visit !== 0 ? (input.visit / nextLevel.criteria.visit) * 100 : 100,
    week: nextLevel.criteria.joinWeek !== 0 ? (input.weekDifference / nextLevel.criteria.joinWeek) * 100 : 100,
  }
}

export const calcLevel = (input: { article: number; comment: number; visit: number; date: string }) => {
  const { day: dayDifference, week: weekDifference } = _calcDifference(new Date(input.date))

  const easterEgg = checkEasterEgg(input)
  if (easterEgg) {
    const nextLevel = easterEgg.id === "158" || easterEgg.id === "116" ? levelInfo[2] : levelInfo[4]

    return {
      ...easterEgg,
      nextLevel,
      progress: calculateProgress({ ...input, weekDifference }, nextLevel),
      difference: { day: dayDifference, week: weekDifference },
    }
  }

  const result = levelInfo
    .map(x => x)
    .reverse()
    .find(
      level =>
        input.article >= level.criteria.article &&
        input.comment >= level.criteria.comment &&
        input.visit >= level.criteria.visit &&
        weekDifference >= level.criteria.joinWeek,
    )

  if (!result) throw new InvalidInputError()

  const levelIndex = levelInfo.findIndex(x => x.id === result.id)
  if (levelIndex < 0) throw new InvalidInputError()

  const nextLevel = levelInfo[levelIndex + 1] || levelInfo[levelIndex]

  return {
    ...result,
    index: levelIndex,
    nextLevel,
    progress: calculateProgress({ ...input, weekDifference }, nextLevel),
    difference: { day: dayDifference, week: weekDifference },
  }
}

export const calcNextLevelTime = (
  wantedLevel: number,
  articleCount: number,
  commentCount: number,
  visitCount: number,
  date: string,
) => {
  const { now: today, day: dayDifference, week: weekDifference } = _calcDifference(new Date(date))

  const wantedLevelInfo = (levelInfo[wantedLevel] || levelInfo[wantedLevel - 2]).criteria

  const articleEstimate = (dayDifference * wantedLevelInfo.article) / articleCount
  const commentEstimate = (dayDifference * wantedLevelInfo.comment) / commentCount
  const visitEstimate = (dayDifference * wantedLevelInfo.visit) / visitCount
  const weekEstimate = weekDifference > 0 ? (dayDifference * wantedLevelInfo.joinWeek) / weekDifference : 0

  const estimateDay = Math.floor(
    Math.max(articleEstimate, commentEstimate, visitEstimate, weekEstimate) - dayDifference,
  )
  const estimateDate = new Date(today.getTime() + estimateDay * 1000 * 3600 * 24)

  if (isNaN(estimateDate.getTime())) {
    return null
  }

  return `${estimateDate.getFullYear()}년 ${
    estimateDate.getMonth() + 1
  }월 ${estimateDate.getDate()}일 (${estimateDay}일 후)`
}
