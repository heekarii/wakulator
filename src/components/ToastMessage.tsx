import { createEffect, createSignal } from "solid-js"
import { Portal } from "solid-js/web"

import { ToastMessageStyle } from "~/styles/components/toastMessage"
import { toast, setToast } from "~/stores/toastMessage"

export default function ToastMessage() {
  const [fadeType, setFadeType] = createSignal<"fadeInUp" | "fadeOutDown">("fadeInUp") // fadeOut 애니메이션도 추가하기

  let timer: NodeJS.Timeout | null = null // FadeOut Timer
  let deleteTimer: NodeJS.Timeout | null = null // Element 삭제하는 Timer

  createEffect(() => {
    if (toast.message) {
      // 이미 타이머가 동작 중이라면 초기화
      if (deleteTimer) {
        clearTimeout(deleteTimer)
        deleteTimer = null
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      setFadeType("fadeInUp")

      // 3초 or duration 뒤 fadeOut 토글
      // duration이 없으면 3초로 설정, null이면 무한대기

      if (toast.duration === null) {
        return () => {
          setFadeType("fadeOutDown")

          setTimeout(() => {
            setToast({ message: null, duration: undefined }) // fadeOut 끝난 뒤 element 삭제
            setFadeType("fadeInUp") // 나중에 다시 toggle될때 대비해서 초기화
          }, 500)
        }
      }

      timer = setTimeout(() => {
        setFadeType("fadeOutDown")

        deleteTimer = setTimeout(() => {
          setToast({ message: null, duration: undefined }) // fadeOut 끝난 뒤 element 삭제
          setFadeType("fadeInUp") // 나중에 다시 toggle될때 대비해서 초기화
        }, 500)
      }, toast.duration ?? 3000)

      return () => {
        clearTimeout(deleteTimer!)
        deleteTimer = null

        clearTimeout(timer!)
        timer = null
      }
    }
  }, [toast.message, setToast])

  return (
    toast && (
      <Portal mount={document.getElementById("root") ?? undefined}>
        <ToastMessageStyle isVisible={!!toast.message} fadeType={fadeType()}>
          <ToastMessageStyle.Text>{toast.message}</ToastMessageStyle.Text>
        </ToastMessageStyle>
      </Portal>
    )
  )
}
