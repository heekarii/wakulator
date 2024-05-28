export type CafeMemberLevelInfo = {
  id: string
  name: string
  description: string
  criteria: {
    article: number
    comment: number
    visit: number
    joinWeek: number
  }
}
