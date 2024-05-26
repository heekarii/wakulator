import { createStore } from "solid-js/store";
import { CafeMemberLevelInfo } from "~/types/cafeMemberLevelInfo";

export const [levelInfo, setLevelInfo] = createStore<CafeMemberLevelInfo[]>([]);
