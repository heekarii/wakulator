import { createStore } from "solid-js/store"

export const [toast, setToast] = createStore<{
  message: string | null
  duration?: number | null
}>({ message: null })
