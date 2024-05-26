import { styled } from "solid-styled-components";

export const Main = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainFlex = styled("div")`
  display: flex;
  gap: 16px;
`;

export const InputSide = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContentWrap = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  max-width: 304px;
`;
