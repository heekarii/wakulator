import { Show, createSignal, onMount } from "solid-js"

import { Title } from "@solidjs/meta"
import { A, useBeforeLeave } from "@solidjs/router"

import { HttpStatusCode } from "@solidjs/start"

import calcActualHeight from "~/utils/calcActualHeightIos"

import { BlueScreen } from "~/styles/error/blueScreen"
import oppositeSegu from "~/assets/images/opposite_segu.svg"
import jinhe from "~/assets/images/jinhe.webp"

export default function NotFound() {
  const [isLoading, setIsLoading] = createSignal<"TRUE" | "HIDE" | "FALSE">("TRUE")
  const [easterEggRandom, setEasterEggRandom] = createSignal<number>(0)

  onMount(() => {
    setEasterEggRandom((Math.random() * 2) | 0)
    setIsLoading("HIDE")

    setTimeout(() => {
      setIsLoading("FALSE")
    }, 158)
  })

  // S: iOS Height 조정
  onMount(() => {
    calcActualHeight()
    window.addEventListener("resize", calcActualHeight)
  })

  useBeforeLeave(() => {
    calcActualHeight()
    window.removeEventListener("resize", calcActualHeight)
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

        <BlueScreen.EasterEgg
          src={easterEggRandom() === 0 ? oppositeSegu : jinhe}
          alt={easterEggRandom() === 0 ? "뒤집힌 세구~" : "우리 차키 이름이 뭐야?"}
          onClick={() => {
            easterEggRandom() === 0
              ? window.open("https://youtu.be/zp_dEdyH_vg")
              : window.open("https://youtu.be/06al4daDPQ8")
          }}
        />
      </BlueScreen>
    </>
  )
}
