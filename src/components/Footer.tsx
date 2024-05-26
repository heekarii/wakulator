import { FooterStyle } from "~/styles/components/footer";

export default function Footer() {
  const character = ["💜", "💛", "🖤", "❤", "💙", "💚"];
  const randomCharacter = (Math.random() * character.length) | 0;

  return (
    <FooterStyle>
      <FooterStyle.Text>
        © 2023-2024 WAKULATOR. All Rights Reserved.
      </FooterStyle.Text>
      <FooterStyle.Text>
        Made by 그적미적, 이파리맛별사탕, Clouuud, Ayaan, SY with{" "}
        <FooterStyle.Text.Emoji>
          {character[randomCharacter]}
        </FooterStyle.Text.Emoji>
      </FooterStyle.Text>
    </FooterStyle>
  );
}
