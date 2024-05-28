import { styled } from "solid-styled-components"

export const Main = styled("main")<{ currentStep: "MAIN" | "RESULT" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100 * var(--vh, 1vh));

  @media (max-width: 768px) {
    ${props => (props.currentStep === "MAIN" ? "height: calc(calc(100 * var(--vh, 1vh)) - 270px);" : "")}
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
