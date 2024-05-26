export type APIMemberLevelInfo = {
  message: {
    status: string;
    error: {
      code: string;
      msg: string;
    };
    result: {
      isCafeMember: false;
      memberLevelList: {
        clubid: number;
        memberlevel: number;
        memberlevelname: string;
        memberleveldesc: string;
        leveliconid: number;
        leveluptype: number;
        articlecount: number;
        commentcount: number;
        visitcount: number;
        joindtcondition: number;
        useyn: string;
        existmember: string;
      }[];
    };
  };
};

export type CafeMemberLevelInfo = {
  id: string;
  name: string;
  description: string;
  criteria: {
    article: number;
    comment: number;
    visit: number;
    joinWeek: number;
  };
};
