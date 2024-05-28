import { For, Show, createEffect, createSignal } from "solid-js"
import html2canvas from "html2canvas"

import { calcLevel, calcNextLevelTime } from "~/utils/calcLevel"

import { levelInfo } from "~/data/wakzoo_levels"
import { ResultTableStyle } from "~/styles/components/resultTable"

import { inputData } from "~/stores/inputData"
import { AFREECATV_IMG_CDN, CAFE_IMG_CDN } from "~/constants/externalIcon"

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

  createEffect(() => {
    const calcResult = calcLevel(props.data as { article: number; comment: number; visit: number; date: string })

    if (!calcResult) {
      alert("등급 계산에 실패했습니다.")
      return null
    }

    setResult(calcResult)
  })

  function downloadImage() {
    html2canvas(document.querySelector("#tableForPrint section")!).then(c => {
      const link = document.createElement("a")
      link.href = c.toDataURL("image/png")
      link.download = `result-${new Date().toISOString().split("T")[0]}.png`
      link.click()
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
                ? `${AFREECATV_IMG_CDN}/in/inehine/inehine.jpg`
                : `${CAFE_IMG_CDN}/${result()!.id}.svg`
            }
            title={result()!.name}
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
            개
          </ResultTableStyle.Text.Label>
        </ResultTableStyle.Text>

        {/* 결과창 예상 등급변경일 정보 & 다운로드 버튼 */}
        <ResultTableStyle.Footer>
          <ul>
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
                    <ResultTableStyle.Footer.EstimatedDate>
                      {nextLevelTime
                        ? `${levelInfo[index].name} ${nextLevelTime}`
                        : index === 2
                          ? "침하! 왁물원 공지를 확인해 주세요!"
                          : ""}
                    </ResultTableStyle.Footer.EstimatedDate>
                  )
                }}
              </For>
            </Show>
            <Show when={result()!.index == 4}>
              <ResultTableStyle.Footer.EstimatedDate>
                {levelInfo[4].name} :{" "}
                {calcNextLevelTime(4, props.data.article, props.data.comment, props.data.visit, props.data.date)}
              </ResultTableStyle.Footer.EstimatedDate>

              <ResultTableStyle.Footer.EstimatedDate>
                슬슬 냄시가 나기 시작하는군요.
              </ResultTableStyle.Footer.EstimatedDate>
            </Show>

            <Show when={result()!.index == 6}>
              <ResultTableStyle.Footer.EstimatedDate>뭔가 아담하시군요.</ResultTableStyle.Footer.EstimatedDate>
            </Show>

            <Show when={result()!.index == 5}>
              <Show
                when={(Math.random() * 3 | 0) === 3}
                fallback={
                  <>
                    <ResultTableStyle.Footer.EstimatedDate>
                      더 이상 달성할 등급이 없어요...
                    </ResultTableStyle.Footer.EstimatedDate>
                    <br />

                    <ResultTableStyle.Footer.EstimatedDate>으 냄시....</ResultTableStyle.Footer.EstimatedDate>
                  </>
                }
              >
                <ResultTableStyle.Footer.EstimatedDate>
                  느그자 개체수가 너무 많아요...
                </ResultTableStyle.Footer.EstimatedDate>
                <br />

                <ResultTableStyle.Footer.EstimatedDate>환생 ㄱ?</ResultTableStyle.Footer.EstimatedDate>
              </Show>
            </Show>
          </ul>

          <Show when={!props.isPrintMode}>
            <ResultTableStyle.Footer.DownloadBtn onClick={() => downloadImage()}>
              <img src="/icons/download_999999.svg" alt="다운로드" />
            </ResultTableStyle.Footer.DownloadBtn>
          </Show>
        </ResultTableStyle.Footer>
      </ResultTableStyle>
    </Show>
  )
}
