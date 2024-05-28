import { createStore } from "solid-js/store"

export const [inputData, setInputData] = createStore<{
  article?: number
  comment?: number
  visit?: number
  date?: string
}>()
