import { styled } from "solid-styled-components"

const _Input = styled("section")`
  display: flex;
  gap: 8px;
`

const _InputIndividual = styled("input")<{
  icon: string
  value?: string | number
}>(
  props => `
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;

  position: relative;
  height: 48px;
  width: 96px;

  border: 0;
  outline: 0;

  background: #f2f2f7;
  background-image: url("/icons/${props.icon}_999999.svg");
  background-size: 20px;
  background-position: calc(100% - 10px) center;
  background-repeat: no-repeat;

  padding: 0 12px;
  border-radius: 8px;
  font-size: 12px;

  &[type="date"] {
    width: 100%;
  }

  &:focus {
    outline: 0.25px #dddddd solid;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-textfield-decoration-container {
    unicode-bidi: normal;
    width: 50px;
  }

  &::-webkit-datetime-edit {
    color: ${props.value ? "#000000" : "#757575"};
  }

  &::-webkit-calendar-picker-indicator {
    height: auto;
    width: auto;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
`,
)

const _InputSubmit = styled("button")<{ isEnabled: boolean }>(
  props => `
  height: 48px;
  width: 48px;
  min-width: 48px;
  border-radius: 8px;

  border: 0;
  outline: 0;

  ${props.isEnabled ? "cursor: pointer;" : ""}

  background: ${props.isEnabled ? "#ee6f3c" : "#999999"};
  background-image: url("/icons/check_ffffff.svg");
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;

  transition-property: color, background-color, border-color;
  transition-timing-function: ease-in-out;
  transition-duration: 158ms;
`,
)

export const Input = Object.assign(_Input, {
  Individual: _InputIndividual,
  Submit: _InputSubmit,
})
