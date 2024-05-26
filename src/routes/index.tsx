import { For, createSignal, onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import { cache, useNavigate, useSearchParams } from "@solidjs/router";

import { validateInput } from "~/data/calcLevel";
import { getLevelInfo } from "~/data/getLevelInfo";
import { levelInfo, setLevelInfo } from "~/stores/levelInfo";

import { ContentWrap, InputSide, Main, MainFlex } from "~/styles/main";
import { Loader } from "~/styles/loader";

import { Logo } from "~/styles/main/logo";
import { Input } from "~/styles/main/input";
import { LevelInfo } from "~/styles/main/levelInfo";

import Footer from "~/components/Footer";
import wakzooLogo from "~/assets/images/wakzoo.svg";
import ResultTable from "~/components/ResultTable";

const levelInfoCache = cache(getLevelInfo, "levelinfo");
export const route = { load: () => levelInfoCache() };

export default function Result() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [articleCount, setArticleCount] = createSignal<number>();
  const [commentCount, setCommentCount] = createSignal<number>();
  const [visitCount, setVisitCount] = createSignal<number>();
  const [date, setDate] = createSignal<string>();

  const [isLoading, setIsLoading] = createSignal<boolean>(true);
  const [isOnceRendered, setIsOnceRendered] = createSignal<boolean>(true);

  onMount(async () => {
    if (searchParams.data) {
      try {
        const data = JSON.parse(atob(searchParams.data!));
        setArticleCount(data.article);
        setCommentCount(data.comment);
        setVisitCount(data.visit);
        setDate(data.date);

        setIsOnceRendered(true);
      } catch {
        navigate("/");
      }
    }

    if (levelInfo.length === 0) {
      setLevelInfo(await levelInfoCache()!);
      setIsLoading(false);
    }
  });

  return (
    <>
      <Title>왁큘레이터 - Wakulator</Title>

      <Loader isLoading={isLoading()}>
        <Loader.Spinner />
      </Loader>

      <Main>
        <MainFlex>
          <InputSide>
            <ContentWrap
              onSubmit={async (e) => {
                e.preventDefault();
                validateInput(
                  articleCount(),
                  commentCount(),
                  visitCount(),
                  date()
                );

                setSearchParams({
                  data: btoa(
                    JSON.stringify({
                      article: articleCount(),
                      comment: commentCount(),
                      visit: visitCount(),
                      date: date(),
                    })
                  ),
                });
              }}
            >
              <Logo
                currentStep={
                  searchParams.data && !isLoading() ? "RESULT" : "MAIN"
                }
              >
                <Logo.Image
                  src={wakzooLogo}
                  currentStep={
                    searchParams.data && !isLoading() ? "RESULT" : "MAIN"
                  }
                  alt="Wakulator"
                />
                <Logo.Text>WAKULATOR</Logo.Text>
              </Logo>

              <Input>
                <Input.Individual
                  type="number"
                  icon="edit_note"
                  min={0}
                  value={articleCount()}
                  onInput={(e) => {
                    setArticleCount(+e.currentTarget.value);
                    setIsOnceRendered(false);
                  }}
                  placeholder="게시글"
                  required
                ></Input.Individual>

                <Input.Individual
                  type="number"
                  icon="chat"
                  min={0}
                  value={commentCount()}
                  onInput={(e) => {
                    setCommentCount(+e.currentTarget.value);
                    setIsOnceRendered(false);
                  }}
                  placeholder="댓글"
                  required
                />

                <Input.Individual
                  type="number"
                  icon="visibility"
                  min={0}
                  value={visitCount()}
                  onInput={(e) => {
                    setVisitCount(+e.currentTarget.value);
                    setIsOnceRendered(false);
                  }}
                  placeholder="방문 수"
                  required
                />
              </Input>

              <Input>
                <Input.Individual
                  type="date"
                  icon="calendar_month"
                  value={date()}
                  min="2015-02-26"
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setDate(e.currentTarget.value);
                    setIsOnceRendered(false);
                  }}
                  onKeyDown={(e) => e.preventDefault()}
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
                ></Input.Submit>
              </Input>
            </ContentWrap>

            <LevelInfo currentStep={!searchParams.data ? "MAIN" : "RESULT"}>
              <For each={levelInfo}>
                {(level) => (
                  <>
                    <LevelInfo.Title
                      title={`${level.name} - ${level.description}`}
                    >
                      <img
                        src={`https://ca-fe.pstatic.net/web-mobile/static/img/${level.id}.svg`}
                        alt={level.name}
                      />
                      <LevelInfo.Title.Text>{level.name}</LevelInfo.Title.Text>
                    </LevelInfo.Title>
                    <LevelInfo.Description>
                      {level.id === "0"
                        ? level.description
                        : `가입 ${level.criteria.joinWeek}주 · 게시글 ${level.criteria.article}개 · 댓글 ${level.criteria.comment}개 · 방문 수 ${level.criteria.visit}회`}
                    </LevelInfo.Description>
                  </>
                )}
              </For>
            </LevelInfo>
          </InputSide>

          {searchParams.data && !isLoading() && (
            <ResultTable
              article={articleCount()!}
              comment={commentCount()!}
              visit={visitCount()!}
              date={date()!}
              isPrintMode={false}
            />
          )}
        </MainFlex>

        <Footer />
      </Main>

      {searchParams.data && !isLoading() && (
        <div id="tableForPrint">
          <ResultTable
            article={articleCount()!}
            comment={commentCount()!}
            visit={visitCount()!}
            date={date()!}
            isPrintMode={true}
          />
        </div>
      )}
    </>
  );
}
