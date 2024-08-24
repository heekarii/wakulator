import { keyframes, styled } from "solid-styled-components"

// 아래에서 위로 올라오는 FadeIn
const _FadeInUpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`

// 다시 아래로 내려가는 FadeOut
const _FadeOutDownAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
`

const _Container = styled("div")<{ fadeType: "fadeInUp" | "fadeOutDown"; isVisible: boolean }>(
  props => `
    background-color: #666666;
    padding: 24px 38px;
    border-radius: 10px;

    width: max-content;
    height: fit-content;

    position: fixed;
    display: ${props.isVisible ? "flex" : "none"};

    z-index: 99;
    left: 50%;
    bottom: 5%;

    opacity: 0;
    transform: translate(-50%, 30px);
    animation: ${props.fadeType === "fadeInUp" ? _FadeInUpAnimation : _FadeOutDownAnimation} 0.5s forwards;
  `,
)

const _Text = styled("p")`
  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin: 0px;
  letter-spacing: -0.18px;
`

export const ToastMessageStyle = Object.assign(_Container, {
  Text: _Text,
})
