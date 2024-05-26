import { styled } from "solid-styled-components";

const _LevelInfo = styled("section")<{ currentStep: "MAIN" | "RESULT" }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  user-select: none;

  ${(props) =>
    props.currentStep === "MAIN"
      ? `@media (min-width: 769px) {
          position: absolute;
          z-index: 3;
          left: 32px;
          bottom: 32px;
        }`
      : `@media (max-width: 768px) {
          display: none;
        }`}
`;

const _LevelInfoTitleWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const _LevelInfoTitleText = styled("span")`
  color: #999999;
  font-size: 12px;
  font-weight: 500;
`;

const _LevelInfoDescription = styled("span")`
  color: #000000;
  font-size: 12px;
  font-weight: 400;
`;

export const LevelInfo = Object.assign(_LevelInfo, {
  Title: Object.assign(_LevelInfoTitleWrapper, { Text: _LevelInfoTitleText }),
  Description: _LevelInfoDescription,
});
