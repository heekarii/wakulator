import { styled } from "solid-styled-components"

const _BlueScreen = styled("main")`
  width: 100vw;
  height: calc(100 * var(--vh, 1vh));
  background: #467ec6;

  user-select: none;
  -webkit-user-select: none;

  @media (max-width: 768px) {
    text-align: center;
  }
`

const _BlueScreenWrapBox = styled("div")`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;

  width: max-content;

  text-align: left;

  @media (min-width: 769px) {
    padding: 158px 0 0 158px;
  }

  @media (max-width: 768px) {
    height: 100%;
    max-width: 304px;
  }
`

const _BlueScreenSadFace = styled("h1")`
  color: #ffffff;
  font-size: 158px;
  font-weight: 500;
`

const _BlueScreenErrorMessage = styled("span")`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;

  @media (max-width: 768px) {
    padding-bottom: 158px;
  }
`

const _BlueScreenOppositeSegu = styled("img")`
  position: absolute;
  right: 15.8px;
  bottom: 15.8px;

  width: 158px;
  opacity: 0.158;

  cursor: pointer;
`

export const BlueScreen = Object.assign(_BlueScreen, {
  WrapBox: _BlueScreenWrapBox,
  SadFace: _BlueScreenSadFace,
  ErrorMessage: _BlueScreenErrorMessage,
  OppositeSegu: _BlueScreenOppositeSegu,
})
