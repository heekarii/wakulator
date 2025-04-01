import { FooterStyle } from "~/styles/components/footer"

export default function Footer(props: { readonly characterIndex: number }) {
  // const character = ["💜", "💛", "🖤", "❤", "💙", "💚"]

  return (
    <FooterStyle>
      <FooterStyle.Text>© 2019-2021 WAKULATOR. All Rights Reserved.</FooterStyle.Text>
      {/*<FooterStyle.Text>
        Made by heekari, 이파리맛별사탕, Clouuud, Ayaan, SY with{" "}
        <FooterStyle.Text.Emoji>{character[props.characterIndex]}</FooterStyle.Text.Emoji>
      </FooterStyle.Text>*/}
      <FooterStyle.Text>우왁끼는 살아있다!!!</FooterStyle.Text>
    </FooterStyle>
  )
}
