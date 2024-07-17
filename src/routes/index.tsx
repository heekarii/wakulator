import { For, Show, createEffect, createSignal, onMount } from "solid-js"

import { Title } from "@solidjs/meta"
import { useNavigate, useSearchParams, useBeforeLeave } from "@solidjs/router"

import calcActualHeight from "~/utils/calcActualHeightIos"
import { validateInput } from "~/utils/calcLevel"

import { levelInfo } from "~/data/wakzoo_levels"
import { inputData, setInputData } from "~/stores/inputData"

import { ContentWrap, InputSide, Main, MainFlex } from "~/styles/main"

import { Logo } from "~/styles/main/logo"
import { Input } from "~/styles/main/input"
import { LevelInfo } from "~/styles/components/levelInfo"

import Footer from "~/components/Footer"
import ResultTable from "~/components/ResultTable"

import wakzooLogo from "~/assets/images/wakzoo.svg"

export default function Result() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [articleCount, setArticleCount] = createSignal<number>()
  const [commentCount, setCommentCount] = createSignal<number>()
  const [visitCount, setVisitCount] = createSignal<number>()
  const [date, setDate] = createSignal<string>()

  const [isLoading, setIsLoading] = createSignal<"TRUE" | "HIDE" | "FALSE">("TRUE")
  const [isOnceRendered, setIsOnceRendered] = createSignal<boolean>(true)
  const [isOkToCalculate, setIsOkToCalculate] = createSignal<boolean>(false)

  // Footer에 하트 이스터에그 - 매 새로고침마다 랜덤으로 나오도록
  const [footerCharacterIndex, setFooterCharacterIndex] = createSignal<number>(0)

  function initData() {
    if (searchParams.data) {
      try {
        const data = JSON.parse(atob(searchParams.data!)) as {
          article: number
          comment: number
          visit: number
          date: string
        }

        // 실제 입력에 사용할 값 정의
        setInputData(data)

        // 단순 input value 복구
        setArticleCount(data.article)
        setCommentCount(data.comment)
        setVisitCount(data.visit)
        setDate(data.date)

        // 프로세스 완료
        setIsOkToCalculate(true)
        setIsOnceRendered(true)
      } catch {
        navigate("/")
      }
    } else {
      setInputData({})
    }

    if (articleCount() === 158 && commentCount() === 158 && visitCount() === 158 && date() === "2021-08-28") {
      // Footer에 하트 이스터에그 - 아이네 이스터에그에서는 무조건 바이올렛으로
      setFooterCharacterIndex(0)
    } else if (articleCount() === 1008 && commentCount() === 1008 && visitCount() === 1008 && date() === "2023-04-30") {
      // Footer에 하트 이스터에그 - 징버거 이스터에그에서는 무조건 블랙으로
      setFooterCharacterIndex(1)
    } else if (articleCount() === 700 && commentCount() === 700 && visitCount() === 700 && date() === "2022-05-10") {
      // Footer에 하트 이스터에그 - 릴파 이스터에그에서는 무조건 블랙으로
      setFooterCharacterIndex(2)
    } else if (articleCount() === 116 && commentCount() === 116 && visitCount() === 116 && date() === "2022-03-01") {
      // Footer에 하트 이스터에그 - 비챤 이스터에그에서는 무조건 블랙으로
      setFooterCharacterIndex(5)
    } else {
      // Footer에 하트 이스터에그 - 매 새로고침마다 랜덤으로 나오도록
      setFooterCharacterIndex(Math.floor(Math.random() * 6) | 0)
    }
  }

  onMount(async () => {
    initData()

    setTimeout(() => {
      setIsLoading("HIDE")

      setTimeout(() => {
        setIsLoading("FALSE")
      }, 158)
    }, 10)
  })

  // S: iOS Height 조정
  onMount(() => {
    calcActualHeight()
    window.addEventListener("resize", calcActualHeight)
  })

  useBeforeLeave(() => {
    calcActualHeight()
    window.removeEventListener("resize", calcActualHeight)
  })
  // E: iOS Height 조정

  createEffect(() => {
    window.addEventListener("popstate", () => {
      if (!searchParams.data) {
        setInputData({})
        setIsOkToCalculate(false)
      } else {
        initData()
      }
    })
  })

  return (
    <>
      <Title>왁큘레이터 - Wakulator</Title>

      <div class="loader" data-isLoading={isLoading().toString()}>
        <div class="loader__spinner" />
      </div>

      <Main currentStep={searchParams.data && isLoading() !== "TRUE" ? "RESULT" : "MAIN"}>
        <MainFlex>
          <InputSide>
            <ContentWrap
              onSubmit={async e => {
                e.preventDefault()
                validateInput(articleCount(), commentCount(), visitCount(), date())

                const data = {
                  article: articleCount(),
                  comment: commentCount(),
                  visit: visitCount(),
                  date: date(),
                }

                // 실제 계산할 데이터 정의
                setInputData(data)

                // 링크 생성
                setSearchParams({
                  data: btoa(JSON.stringify(data)),
                })

                if (data.article === 158 && data.comment === 158 && data.visit === 158 && data.date === "2021-08-28") {
                  // Footer에 하트 이스터에그 - 아이네 이스터에그에서는 무조건 바이올렛으로
                  setFooterCharacterIndex(0)
                }

                if (
                  data.article === 1008 &&
                  data.comment === 1008 &&
                  data.visit === 1008 &&
                  data.date === "2023-04-30"
                ) {
                  // Footer에 하트 이스터에그 - 징버거 이스터에그에서는 무조건 블랙으로
                  setFooterCharacterIndex(1)
                }

                if (data.article === 700 && data.comment === 700 && data.visit === 700 && data.date === "2022-05-10") {
                  // Footer에 하트 이스터에그 - 릴파 이스터에그에서는 무조건 블랙으로
                  setFooterCharacterIndex(2)
                }

                if (data.article === 116 && data.comment === 116 && data.visit === 116 && data.date === "2022-03-01") {
                  // Footer에 하트 이스터에그 - 비챤 이스터에그에서는 무조건 블랙으로
                  setFooterCharacterIndex(5)
                }

                // 프로세스 완료
                setIsOkToCalculate(true)
                setIsOnceRendered(true)
              }}
            >
              <a
                href="/"
                onClick={e => {
                  e.preventDefault()
                  window.location.href = "/"
                }}
              >
                <Logo currentStep={searchParams.data && isLoading() !== "TRUE" ? "RESULT" : "MAIN"}>
                  <Logo.Image
                    src={wakzooLogo}
                    currentStep={searchParams.data && isLoading() !== "TRUE" ? "RESULT" : "MAIN"}
                    alt="Wakulator Logo"
                  />
                  <Logo.Text>WAKULATOR</Logo.Text>
                </Logo>
              </a>

              <Input>
                <Input.Individual
                  type="number"
                  icon="edit_note"
                  min={0}
                  value={articleCount()}
                  onInput={e => {
                    setArticleCount(+e.currentTarget.value)
                    setIsOnceRendered(false)
                  }}
                  placeholder="게시글"
                  aria-label="게시글"
                  required
                ></Input.Individual>

                <Input.Individual
                  type="number"
                  icon="chat"
                  min={0}
                  value={commentCount()}
                  onInput={e => {
                    setCommentCount(+e.currentTarget.value)
                    setIsOnceRendered(false)
                  }}
                  placeholder="댓글"
                  aria-label="댓글"
                  required
                />

                <Input.Individual
                  type="number"
                  icon="visibility"
                  min={0}
                  value={visitCount()}
                  onInput={e => {
                    setVisitCount(+e.currentTarget.value)
                    setIsOnceRendered(false)
                  }}
                  placeholder="방문 수"
                  aria-label="방문 수"
                  required
                />
              </Input>

              <Input>
                <Input.Individual
                  type="date"
                  icon="calendar_month"
                  value={date()}
                  min="2015-02-26"
                  aria-label="가입일"
                  onChange={e => {
                    setDate(e.currentTarget.value)
                    setIsOnceRendered(false)
                  }}
                  onKeyDown={e => e.preventDefault()}
                  required
                />

                <Input.Submit
                  isEnabled={
                    articleCount() !== undefined &&
                    commentCount() !== undefined &&
                    visitCount() !== undefined &&
                    date() !== undefined &&
                    !isOnceRendered()
                  }
                  disabled={
                    articleCount() === undefined ||
                    commentCount() === undefined ||
                    visitCount() === undefined ||
                    date() === undefined ||
                    isOnceRendered()
                  }
                  aria-label="계산하기"
                ></Input.Submit>
              </Input>
            </ContentWrap>

            <Show when={levelInfo}>
              <LevelInfo
                currentStep={
                  inputData?.article !== undefined &&
                  inputData?.comment !== undefined &&
                  inputData?.visit !== undefined &&
                  inputData?.date !== undefined &&
                  isOkToCalculate()
                    ? "RESULT"
                    : "MAIN"
                }
              >
                <For each={levelInfo}>
                  {level => (
                    <>
                      <LevelInfo.Title title={`${level.name} - ${level.description}`}>
                        <img src={`/icons/levels/${level.id}.svg`} alt={level.name} width={18} height={18} />
                        <LevelInfo.Title.Text>{level.name}</LevelInfo.Title.Text>
                      </LevelInfo.Title>
                      <LevelInfo.Description>
                        {level.id === "0"
                          ? level.description
                          : `가입 ${level.criteria.joinWeek}주 후 · 게시글 ${level.criteria.article}개 · 댓글 ${level.criteria.comment}개 · 방문 수 ${level.criteria.visit}회`}
                      </LevelInfo.Description>
                    </>
                  )}
                </For>
              </LevelInfo>
            </Show>
          </InputSide>

          <Show
            when={
              inputData?.article !== undefined &&
              inputData?.comment !== undefined &&
              inputData?.visit !== undefined &&
              inputData?.date !== undefined &&
              isOkToCalculate()
            }
          >
            <ResultTable data={inputData} isPrintMode={false} />
          </Show>
        </MainFlex>

        <Footer characterIndex={footerCharacterIndex()} />
      </Main>

      <Show when={isOkToCalculate()}>
        <div id="tableForPrint">
          <ResultTable data={inputData} isPrintMode={true} />
        </div>
      </Show>
    </>
  )
}
