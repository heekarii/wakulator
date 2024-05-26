import axios from "axios";

import { CAFE_INTERNAL_API_HOST, CAFE_ID } from "~/constants/cafe";
import {
  APIMemberLevelInfo,
  CafeMemberLevelInfo,
} from "~/types/cafeMemberLevelInfo";

export const getLevelInfo = async (): Promise<CafeMemberLevelInfo[]> => {
  "use server";

  const { data } = await axios.get<APIMemberLevelInfo>(
    `${CAFE_INTERNAL_API_HOST}/CafeMemberLevelInfo?cafeId=${CAFE_ID}`
  );

  return data.message.result.memberLevelList
    .sort((a, b) => a.memberlevel - b.memberlevel)
    .map((x) => {
      return {
        id: x.memberlevel === 1 ? "0" : `1_${x.memberlevel}`,
        name: x.memberlevelname,
        description: x.memberleveldesc,
        criteria: {
          article: x.articlecount,
          comment: x.commentcount,
          visit: x.visitcount,
          joinWeek: x.joindtcondition,
        },
      };
    }) as CafeMemberLevelInfo[];
};
