import { styled } from "solid-styled-components";

const _Loader = styled("div")<{ isLoading: boolean }>(
  (props) => `
  display: flex;
  height: 100vh;
  width: 100vw;

  position: absolute;
  align-items: center;
  justify-content: center;

  z-index: 2;
  background: rgb(255, 255, 255, 0.7);

  ${props.isLoading ? "" : "display: none;"}
`
);

const _LoaderSpinner = styled("div")`
  width: 48px;
  height: 48px;

  border: 5px solid #ee6f3c;
  border-bottom-color: transparent;
  border-radius: 50%;

  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  z-index: 3;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = Object.assign(_Loader, {
  Spinner: _LoaderSpinner,
});
