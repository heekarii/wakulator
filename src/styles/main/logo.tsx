import { styled } from "solid-styled-components";

const _Logo = styled("section")<{ currentStep: "MAIN" | "RESULT" }>`
  display: flex;
  ${(props) =>
    props.currentStep === "MAIN"
      ? "flex-direction: column;"
      : "align-items: center;"}

  gap: 8px;
  margin-bottom: 12px;
`;

const _LogoImage = styled("img")<{ currentStep: "MAIN" | "RESULT" }>`
  ${(props) =>
    props.currentStep === "MAIN"
      ? "width: 64px; height: 64px; border-radius: 16px;"
      : "width: 32px; height: 32px; border-radius: 8px;"}
`;

const _LogoText = styled("h1")`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Logo = Object.assign(_Logo, {
  Image: _LogoImage,
  Text: _LogoText,
});
