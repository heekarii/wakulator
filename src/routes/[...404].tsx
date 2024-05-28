import { createSignal, onMount } from "solid-js"

import { Title } from "@solidjs/meta"
import { A, useBeforeLeave } from "@solidjs/router"

import { HttpStatusCode } from "@solidjs/start"

import { BlueScreen } from "~/styles/error/blueScreen"
import oppositeSegu from "~/assets/images/opposite_segu.svg"
import calcActualHeight from "~/utils/calcActualHeightIos"

export default function NotFound() {
  const [isLoading, setIsLoading] = createSignal<"TRUE" | "HIDE" | "FALSE">("TRUE")

  onMount(() => {
    setIsLoading("HIDE")

    setTimeout(() => {
      setIsLoading("FALSE")
    }, 158)
  })

  // S: iOS Height 조정
  onMount(() => {
    calcActualHeight();
    window.addEventListener("resize", calcActualHeight);
  })

  useBeforeLeave(() => {
    calcActualHeight();
    window.removeEventListener("resize", calcActualHeight);
  })
  // E: iOS Height 조정

  return (
    <>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />

<div class="loader" data-isLoading={isLoading().toString()}>
  <div class="loader__spinner" />
</div>

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
            window.open("https://youtu.be/zp_dEdyH_vg")
          }}
        />
      </BlueScreen>
    </>
  )
}
