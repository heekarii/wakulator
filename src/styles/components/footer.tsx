import { styled } from "solid-styled-components";

const _FooterStyle = styled("section")`
  display: flex;
  flex-direction: column;
  gap: 4px;

  position: absolute;
  z-index: 3;
  bottom: 32px;

  @media (max-width: 768px) {
    left: 0px;
    width: 100%;
  }

  @media (min-width: 769px) {
    right: 32px;
  }
`;

const _FooterStyleText = styled("span")`
  color: #000000;
  font-size: 12px;
  font-weight: 400;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const _FooterStyleEmoji = styled("span")`
  font-family: "TossFace", "Segoe UI Emoji";
`;

export const FooterStyle = Object.assign(_FooterStyle, {
  Text: Object.assign(_FooterStyleText, { Emoji: _FooterStyleEmoji }),
});
