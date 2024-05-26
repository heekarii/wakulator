import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

import { HttpStatusCode } from "@solidjs/start";

import { BlueScreen } from "~/styles/error/blueScreen";
import oppositeSegu from "~/assets/images/opposite_segu.svg";

export default function NotFound() {
  return (
    <>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />

      <BlueScreen>
        <BlueScreen.WrapBox>
          <BlueScreen.SadFace>:&lpar;</BlueScreen.SadFace>
          <BlueScreen.ErrorMessage>
            어딜 접근하시려는거에욧!
            <br />
            참을 수 없어욧!
            <br />
            <br />
            <A href="/">
              메인페이지로 돌아가서 냄시를 확인하려면 <u>여기</u>를 눌러주세욧!
            </A>
          </BlueScreen.ErrorMessage>
        </BlueScreen.WrapBox>

        <BlueScreen.OppositeSegu
          src={oppositeSegu}
          alt="뒤집힌 세구~"
          onClick={() => {
            alert("뒤집힌 세구~");
          }}
        />
      </BlueScreen>
    </>
  );
}
