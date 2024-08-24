import { styled } from "solid-styled-components"

export const Main = styled("main")<{ currentStep: "MAIN" | "RESULT" }>`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    ${props => (props.currentStep === "MAIN" ? "height: calc(100dvh - 270px);" : "")}
  }
`

export const MainFlex = styled("div")`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const InputSide = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ContentWrap = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  max-width: 304px;
`
