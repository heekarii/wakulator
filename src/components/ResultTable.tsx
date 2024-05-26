import { For } from "solid-js";
import { calcNextLevelTime } from "~/data/calcLevel";

import { levelInfo } from "~/stores/levelInfo";
import { ResultTableStyle } from "~/styles/components/resultTable";

import html2canvas from "html2canvas";

export default function ResultTable({
  article,
  comment,
  visit,
  date,
  isPrintMode,
}: {
  article: number;
  comment: number;
  visit: number;
  date: string;
  isPrintMode: boolean;
}) {
  const today = new Date();
  const target = new Date(date);
  const difference = today.getTime() - target.getTime();

  const dayDifference = Math.floor(difference / (1000 * 3600 * 24));
  const weekDifference = Math.floor(dayDifference / 7);

  const data =
    article === 158 && comment === 158 && visit === 158 && date === "2021-06-22"
      ? {
          id: 158,
          name: "아이네",
          criteria: {
            article: 50,
            comment: 250,
            visit: 250,
            joinWeek: 4,
          },
        }
      : levelInfo
          .map((x) => x)
          .reverse()
          .find(
            (level) =>
              article >= level.criteria.article &&
              comment >= level.criteria.comment &&
              visit >= level.criteria.visit &&
              weekDifference >= level.criteria.joinWeek
          );

  const levelIndex =
    article === 158 && comment === 158 && visit === 158 && date === "2021-06-22"
      ? 6
      : levelInfo.findIndex((x) => x.id === data!.id);
  const nextLevel =
    article === 158 && comment === 158 && visit === 158 && date === "2021-06-22"
      ? data!
      : levelInfo[levelIndex + 1] || levelInfo[levelIndex];

  const progress = {
    article: (article / nextLevel.criteria.article) * 100,
    comment: (comment / nextLevel.criteria.comment) * 100,
    visit: (visit / nextLevel.criteria.visit) * 100,
    week: (weekDifference / nextLevel.criteria.joinWeek) * 100,
  };

  if (data === undefined || levelIndex === -1) {
    alert("데이터가 없습니다.");
    return null;
  }

  function downloadImage() {
    html2canvas(document.querySelector("#tableForPrint section")!).then((c) => {
      const link = document.createElement("a");
      link.href = c.toDataURL("image/png");
      link.download = `result-${new Date().toISOString().split("T")[0]}.png`;
      link.click();
    });
  }

  return (
    <ResultTableStyle level={levelIndex} isPrintMode={isPrintMode}>
      {/* 결과창 헤더 */}
      <ResultTableStyle.Header>
        <div>
          <ResultTableStyle.Header.LevelName isDarkMode={false}>
            {data.name}
          </ResultTableStyle.Header.LevelName>
          <ResultTableStyle.Header.Detail isDarkMode={false}>
            {((article * 5 + comment + visit) / 15000).toFixed(3)} GZA,{" "}
            {((comment + visit / 3) / 2).toFixed(3)} ZDG
          </ResultTableStyle.Header.Detail>
        </div>

        <ResultTableStyle.Header.LevelIcon
          src={
            data.id === 158
              ? "https://profile.img.afreecatv.com/LOGO/in/inehine/inehine.jpg"
              : `https://ca-fe.pstatic.net/web-mobile/static/img/${data.id}.svg`
          }
          alt={data.name}
        />
      </ResultTableStyle.Header>

      {/* 결과창 프로그레스바 그룹 */}
      <>
        <ResultTableStyle.Progress>
          <ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>
              게시글
            </ResultTableStyle.Progress.Labels.Name>
            <ResultTableStyle.Progress.Labels.Label>
              {progress.article.toFixed(2)}% ({article}/
              {nextLevel.criteria.article})
            </ResultTableStyle.Progress.Labels.Label>
          </ResultTableStyle.Progress.Labels>
          <ResultTableStyle.Progress.Bar>
            <ResultTableStyle.Progress.Bar.Overlay
              percentage={progress.article >= 100 ? 100 : progress.article}
              level={levelIndex}
            />
          </ResultTableStyle.Progress.Bar>
        </ResultTableStyle.Progress>
        <ResultTableStyle.Progress>
          <ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>
              댓글
            </ResultTableStyle.Progress.Labels.Name>
            <ResultTableStyle.Progress.Labels.Label>
              {progress.comment.toFixed(2)}% ({comment}/
              {nextLevel.criteria.comment})
            </ResultTableStyle.Progress.Labels.Label>
          </ResultTableStyle.Progress.Labels>
          <ResultTableStyle.Progress.Bar>
            <ResultTableStyle.Progress.Bar.Overlay
              percentage={progress.comment >= 100 ? 100 : progress.comment}
              level={levelIndex}
            />
          </ResultTableStyle.Progress.Bar>
        </ResultTableStyle.Progress>
        <ResultTableStyle.Progress>
          <ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>
              방문수
            </ResultTableStyle.Progress.Labels.Name>
            <ResultTableStyle.Progress.Labels.Label>
              {progress.visit.toFixed(2)}% ({visit}/{nextLevel.criteria.visit})
            </ResultTableStyle.Progress.Labels.Label>
          </ResultTableStyle.Progress.Labels>
          <ResultTableStyle.Progress.Bar>
            <ResultTableStyle.Progress.Bar.Overlay
              percentage={progress.visit >= 100 ? 100 : progress.visit}
              level={levelIndex}
            />
          </ResultTableStyle.Progress.Bar>
        </ResultTableStyle.Progress>
        <ResultTableStyle.Progress>
          <ResultTableStyle.Progress.Labels>
            <ResultTableStyle.Progress.Labels.Name isDarkMode={false}>
              가입 주수
            </ResultTableStyle.Progress.Labels.Name>
            <ResultTableStyle.Progress.Labels.Label>
              {progress.week.toFixed(2)}% ({weekDifference}/
              {nextLevel.criteria.joinWeek})
            </ResultTableStyle.Progress.Labels.Label>
          </ResultTableStyle.Progress.Labels>
          <ResultTableStyle.Progress.Bar>
            <ResultTableStyle.Progress.Bar.Overlay
              percentage={progress.week >= 100 ? 100 : progress.week}
              level={levelIndex}
            />
          </ResultTableStyle.Progress.Bar>
        </ResultTableStyle.Progress>
      </>

      {/* 결과창 상세 정보 */}
      <ResultTableStyle.Text>
        <ResultTableStyle.Text.Label>
          하루 평균 글 작성 수
        </ResultTableStyle.Text.Label>
        <ResultTableStyle.Text.Label>
          {(dayDifference === 0 ? article : article / dayDifference).toFixed(3)}
          개
        </ResultTableStyle.Text.Label>
      </ResultTableStyle.Text>

      <ResultTableStyle.Text>
        <ResultTableStyle.Text.Label>
          하루 평균 댓글 수
        </ResultTableStyle.Text.Label>
        <ResultTableStyle.Text.Label>
          {(dayDifference === 0 ? comment : comment / dayDifference).toFixed(3)}
          개
        </ResultTableStyle.Text.Label>
      </ResultTableStyle.Text>

      <ResultTableStyle.Text>
        <ResultTableStyle.Text.Label>
          하루 평균 방문 수
        </ResultTableStyle.Text.Label>
        <ResultTableStyle.Text.Label>
          {(dayDifference === 0 ? visit : visit / dayDifference).toFixed(3)}개
        </ResultTableStyle.Text.Label>
      </ResultTableStyle.Text>

      {/* 결과창 예상 등급변경일 정보 & 다운로드 버튼 */}
      <ResultTableStyle.Footer>
        <ul>
          {levelIndex < 4 ? (
            <For each={[levelIndex + 1, levelIndex + 2]}>
              {(index) => (
                <ResultTableStyle.Footer.EstimatedDate>
                  {levelInfo[index].name} :{" "}
                  {calcNextLevelTime(index, article, comment, visit, date)}
                </ResultTableStyle.Footer.EstimatedDate>
              )}
            </For>
          ) : levelIndex == 4 ? (
            <>
              <ResultTableStyle.Footer.EstimatedDate>
                {levelInfo[4].name} :{" "}
                {calcNextLevelTime(4, article, comment, visit, date)}
              </ResultTableStyle.Footer.EstimatedDate>

              <ResultTableStyle.Footer.EstimatedDate>
                슬슬 냄시가 나기 시작하는군요.
              </ResultTableStyle.Footer.EstimatedDate>
            </>
          ) : levelIndex == 6 ? (
            <ResultTableStyle.Footer.EstimatedDate>
              뭔가 아담하시군요.
            </ResultTableStyle.Footer.EstimatedDate>
          ) : Math.random() >= 0.158 ? (
            <>
              <ResultTableStyle.Footer.EstimatedDate>
                더 이상 달성할 등급이 없어요...
              </ResultTableStyle.Footer.EstimatedDate>
              <br />

              <ResultTableStyle.Footer.EstimatedDate>
                으 냄시....
              </ResultTableStyle.Footer.EstimatedDate>
            </>
          ) : (
            <>
              <ResultTableStyle.Footer.EstimatedDate>
                느그자 개체수가 너무 많아요...
              </ResultTableStyle.Footer.EstimatedDate>
              <br />

              <ResultTableStyle.Footer.EstimatedDate>
                환생 ㄱ?
              </ResultTableStyle.Footer.EstimatedDate>
            </>
          )}
        </ul>

        {!isPrintMode && (
          <ResultTableStyle.Footer.DownloadBtn onClick={() => downloadImage()}>
            <img src="/icons/download_999999.svg" alt="다운로드" />
          </ResultTableStyle.Footer.DownloadBtn>
        )}
      </ResultTableStyle.Footer>
    </ResultTableStyle>
  );
}
