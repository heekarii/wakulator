import { For, Show, createEffect, createSignal } from "solid-js"

import workerUrl from "modern-screenshot/worker?url"
import { Context, createContext, destroyContext, domToPng } from "modern-screenshot"

import { calcLevel, calcNextLevelTime } from "~/utils/calcLevel"

import { levelInfo } from "~/data/wakzoo_levels"
import { ResultTableStyle } from "~/styles/components/resultTable"

import { inputData } from "~/stores/inputData"
import { toast, setToast } from "~/stores/toastMessage"

import ineProfile from "~/assets/images/easteregg/profile/ine.webp"
import battlemaidLilpa from "~/assets/images/easteregg/profile/battlemaid_lilpa.webp"
import blackJingburger from "~/assets/images/easteregg/profile/black_jingburger.webp"
import mangnyangnyangViichan from "~/assets/images/easteregg/profile/mangnyangnyang_viichan.webp"

export default function ResultTable(props: { data: typeof inputData; isPrintMode: boolean }) {
  if (
    props.data.article === undefined ||
    props.data.comment === undefined ||
    props.data.visit === undefined ||
    props.data.date === undefined
  ) {
    return null
  }

  const [result, setResult] = createSignal<ReturnType<typeof calcLevel>>()
  const [domToPngContext, setDomToPngContext] = createSignal<Context<HTMLDivElement>>()
  const [isNowDownloading, setIsNowDownloading] = createSignal<boolean>(false)

  createEffect(() => {
    try {
      const calcResult = calcLevel(props.data as { article: number; comment: number; visit: number; date: string })
      setResult(calcResult)
    } catch (error) {
      setToast({ message: (error as Error).message || "등급 계산에 실패했습니다." })
      return null
    }

    setTimeout(async () => {
      if (domToPngContext()) {
        destroyContext(domToPngContext()!)
      }

      const context = await createContext<HTMLDivElement>(document.querySelector("#tableForPrint section")!, {
        backgroundColor: "#ffffff",
        debug: import.meta.env.MODE !== "production",

        scale: 6,

        workerUrl,
        workerNumber: 1,
      })

      setDomToPngContext(context)
    }, 10)
  })

  function downloadImage() {
    if (isNowDownloading()) return

    if (!domToPngContext()) {
      setToast({ message: "이미지를 저장하는데 문제가 발생했어요." })
      return
    }

    setIsNowDownloading(true)

    if (window.matchMedia("(max-width: 768px)").matches) {
      setToast({ message: "이미지를 만들고 있어요.", duration: null })
    } else {
      setToast({ message: "이미지를 만들고 있어요. 잠시만 기다려 주세요.", duration: null })
    }

    domToPng(domToPngContext()!).then((dataUrl: string) => {
      setToast({ ...toast, duration: 1 })

      setTimeout(() => {
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = `result-${new Date().toISOString().split("T")[0]}.png`
        link.click()

        setToast({ message: "이미지를 저장했어요." })
        setIsNowDownloading(false)
      }, 700)
    })
  }

  return (
    <Show when={result()}>
      <ResultTableStyle level={result()!.index} isPrintMode={props.isPrintMode}>
        {/* 결과창 헤더 */}
        <ResultTableStyle.Header>
          <div>
            <ResultTableStyle.Header.LevelName isDarkMode={false}>{result()!.name}</ResultTableStyle.Header.LevelName>
            <ResultTableStyle.Header.Detail isDarkMode={false}>
              {((props.data.article * 5 + props.data.comment + props.data.visit) / 15000).toFixed(3)} GZA,{" "}
              {((props.data.comment + props.data.visit / 3) / 2).toFixed(3)} ZDG
            </ResultTableStyle.Header.Detail>
          </div>

          <ResultTableStyle.Header.LevelIcon
            src={
              result()!.id === 158
                ? ineProfile
                : result()!.id === 700
                  ? battlemaidLilpa
                  : result()!.id === 1008
                    ? blackJingburger
                    : result()!.id === 116
                      ? mangnyangnyangViichan
                      : `/icons/levels/${result()!.id}.svg`
            }
            alt={result()!.name}
          />
        </ResultTableStyle.Header>

        {/* 결과창 프로그레스바 그룹 */}
        <>
          <ResultTableStyle.Progress>
            <ResultTableStyle.Progress.Labels>
              <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>게시글</ResultTableStyle.Progress.Labels.Name>
              <ResultTableStyle.Progress.Labels.Label>
                {result()!.progress.article.toFixed(2)}% ({props.data.article}/{result()!.nextLevel.criteria.article})
              </ResultTableStyle.Progress.Labels.Label>
            </ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Bar>
              <ResultTableStyle.Progress.Bar.Overlay
                percentage={result()!.progress.article >= 100 ? 100 : result()!.progress.article}
                level={result()!.index}
              />
            </ResultTableStyle.Progress.Bar>
          </ResultTableStyle.Progress>
          <ResultTableStyle.Progress>
            <ResultTableStyle.Progress.Labels>
              <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>댓글</ResultTableStyle.Progress.Labels.Name>
              <ResultTableStyle.Progress.Labels.Label>
                {result()!.progress.comment.toFixed(2)}% ({props.data.comment}/{result()!.nextLevel.criteria.comment})
              </ResultTableStyle.Progress.Labels.Label>
            </ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Bar>
              <ResultTableStyle.Progress.Bar.Overlay
                percentage={result()!.progress.comment >= 100 ? 100 : result()!.progress.comment}
                level={result()!.index}
              />
            </ResultTableStyle.Progress.Bar>
          </ResultTableStyle.Progress>
          <ResultTableStyle.Progress>
            <ResultTableStyle.Progress.Labels>
              <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>방문수</ResultTableStyle.Progress.Labels.Name>
              <ResultTableStyle.Progress.Labels.Label>
                {result()!.progress.visit.toFixed(2)}% ({props.data.visit}/{result()!.nextLevel.criteria.visit})
              </ResultTableStyle.Progress.Labels.Label>
            </ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Bar>
              <ResultTableStyle.Progress.Bar.Overlay
                percentage={result()!.progress.visit >= 100 ? 100 : result()!.progress.visit}
                level={result()!.index}
              />
            </ResultTableStyle.Progress.Bar>
          </ResultTableStyle.Progress>
          <ResultTableStyle.Progress>
            <ResultTableStyle.Progress.Labels>
              <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>
                가입 주수
              </ResultTableStyle.Progress.Labels.Name>
              <ResultTableStyle.Progress.Labels.Label>
                {result()!.progress.week.toFixed(2)}% ({result()!.difference.week}/
                {result()!.nextLevel.criteria.joinWeek})
              </ResultTableStyle.Progress.Labels.Label>
            </ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Bar>
              <ResultTableStyle.Progress.Bar.Overlay
                percentage={result()!.progress.week >= 100 ? 100 : result()!.progress.week}
                level={result()!.index}
              />
            </ResultTableStyle.Progress.Bar>
          </ResultTableStyle.Progress>
        </>

        {/* 결과창 상세 정보 */}
        <ResultTableStyle.Text>
          <ResultTableStyle.Text.Label>하루 평균 글 작성 수</ResultTableStyle.Text.Label>
          <ResultTableStyle.Text.Label>
            {(result()!.difference.day === 0
              ? props.data.article
              : props.data.article / result()!.difference.day
            ).toFixed(3)}
            개
          </ResultTableStyle.Text.Label>
        </ResultTableStyle.Text>

        <ResultTableStyle.Text>
          <ResultTableStyle.Text.Label>하루 평균 댓글 수</ResultTableStyle.Text.Label>
          <ResultTableStyle.Text.Label>
            {(result()!.difference.day === 0
              ? props.data.comment
              : props.data.comment / result()!.difference.day
            ).toFixed(3)}
            개
          </ResultTableStyle.Text.Label>
        </ResultTableStyle.Text>

        <ResultTableStyle.Text>
          <ResultTableStyle.Text.Label>하루 평균 방문 수</ResultTableStyle.Text.Label>
          <ResultTableStyle.Text.Label>
            {(result()!.difference.day === 0 ? props.data.visit : props.data.visit / result()!.difference.day).toFixed(
              3,
            )}
            회
          </ResultTableStyle.Text.Label>
        </ResultTableStyle.Text>

        {/* 결과창 예상 등급변경일 정보 & 다운로드 버튼 */}
        <ResultTableStyle.Footer>
          <ResultTableStyle.Footer.EstimatedDate>
            <Show when={result()!.index < 4}>
              <For each={[result()!.index + 1, result()!.index + 2]}>
                {index => {
                  const nextLevelTime = calcNextLevelTime(
                    index,
                    props.data.article!,
                    props.data.comment!,
                    props.data.visit!,
                    props.data.date!,
                  )

                  return (
                    <ResultTableStyle.Footer.EstimatedDate.Text>
                      {nextLevelTime
                        ? `${levelInfo[index].name} : ${nextLevelTime}`
                        : index === 2
                          ? "침하! 왁물원 공지를 확인해 주세요!"
                          : ""}
                    </ResultTableStyle.Footer.EstimatedDate.Text>
                  )
                }}
              </For>
            </Show>

            <Show when={result()!.index == 4}>
              <ResultTableStyle.Footer.EstimatedDate.Text>
                {levelInfo[5].name} :{" "}
                {calcNextLevelTime(5, props.data.article, props.data.comment, props.data.visit, props.data.date)}
              </ResultTableStyle.Footer.EstimatedDate.Text>

              <ResultTableStyle.Footer.EstimatedDate.Text>
                슬슬 냄시가 나기 시작하는군요.
              </ResultTableStyle.Footer.EstimatedDate.Text>
            </Show>

            <Show when={result()!.index == 6}>
              <ResultTableStyle.Footer.EstimatedDate.Text>
                뭔가 아담하시군요.
              </ResultTableStyle.Footer.EstimatedDate.Text>
            </Show>

            <Show when={result()!.index == 7}>
              <ResultTableStyle.Footer.EstimatedDate.Text>철컥 탕탕탕탕탕</ResultTableStyle.Footer.EstimatedDate.Text>
            </Show>

            <Show when={result()!.index == 8}>
              <ResultTableStyle.Footer.EstimatedDate.Text>좀 모시깽하군요</ResultTableStyle.Footer.EstimatedDate.Text>
            </Show>

            <Show when={result()!.index == 9}>
              <ResultTableStyle.Footer.EstimatedDate.Text>
                느그자의 부름에 응한다..!
              </ResultTableStyle.Footer.EstimatedDate.Text>
            </Show>

            <Show when={result()!.index == 5}>
              <Show
                when={Math.random() < 0.5}
                fallback={
                  <>
                    <ResultTableStyle.Footer.EstimatedDate.Text>
                      더 이상 달성할 등급이 없어요...
                    </ResultTableStyle.Footer.EstimatedDate.Text>

                    <ResultTableStyle.Footer.EstimatedDate.Text>으 냄시....</ResultTableStyle.Footer.EstimatedDate.Text>
                  </>
                }
              >
                <ResultTableStyle.Footer.EstimatedDate.Text>
                  느그자 개체수가 너무 많아요...
                </ResultTableStyle.Footer.EstimatedDate.Text>

                <ResultTableStyle.Footer.EstimatedDate.Text>환생 ㄱ?</ResultTableStyle.Footer.EstimatedDate.Text>
              </Show>
            </Show>
          </ResultTableStyle.Footer.EstimatedDate>

          <Show when={!props.isPrintMode}>
            <ResultTableStyle.Footer.DownloadBtn onClick={() => downloadImage()}>
              <img src="/icons/download_666666.svg" alt="다운로드" />
            </ResultTableStyle.Footer.DownloadBtn>
          </Show>
        </ResultTableStyle.Footer>
      </ResultTableStyle>
    </Show>
  )
}
