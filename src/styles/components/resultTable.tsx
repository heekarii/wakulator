import { styled } from "solid-styled-components"
import { LEVEL_COLORS, LEVEL_GRADIENTS } from "~/constants/styles"

const _Result = styled("section")<{ level: number; isPrintMode: boolean }>(
  props => `
  width: 272px;
  height: min-content;

  padding: 16px;
  background: ${LEVEL_GRADIENTS[props.level]};


  ${!props.isPrintMode ? "border-radius: 8px;" : ""}
`,
)

//#region Header
const _ResultHeaderWrapper = styled("section")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
`

const _ResultLevelName = styled("h1")<{ isDarkMode: boolean }>`
  color: ${props => (props.isDarkMode ? "#ffffff" : "#000000")};
  font-size: 28px;
  font-weight: 600;
`

const _ResultLevelIcon = styled("img")`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`

const _ResultDetail = styled("span")<{ isDarkMode: boolean }>`
  color: ${props => (props.isDarkMode ? "#ffffff" : "#000000")};
  font-size: 12px;
  font-weight: 500;
`
//#endregion

//#region ProgressBar
const _ResultProgressWrapper = styled("section")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`

const _ResultProgressLabels = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const _ResultProgressName = styled("span")<{ isDarkMode: boolean }>`
  color: ${props => (props.isDarkMode ? "#ffffff" : "#000000")};
  font-size: 16px;
  font-weight: 500;
`

const _ResultProgressLabel = styled("span")`
  color: #666666;
  font-size: 12px;
  font-weight: 500;
`

const _ResultProgressBackground = styled("div")`
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background: #666666;
`

const _ResultProgressOverlay = styled("div")<{
  percentage: number
  level: number
}>(
  props => `
    width: ${props.percentage}%;
    height: 8px;
    border-radius: 8px;
    background: ${LEVEL_COLORS[props.level]};
`,
)
//#endregion

//#region Text
const _ResultTextWrapper = styled("section")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const _ResultTextLabel = styled("span")`
  color: #000000;
  font-size: 12px;
  font-weight: 500;
`
//#endregion

//#region Footer
const _ResultFooterWrapper = styled("section")`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const _ResultEstimatedDate = styled("ul")`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`

const _ResultEstimatedDateText = styled("li")`
  color: #666666;
  list-style: none;

  font-size: 12px;
  font-weight: 400;
`

const _ResultDownloadBtn = styled("button")`
  background-color: inherit;
  border: none;
  cursor: pointer;
`
//#endregion

export const ResultTableStyle = Object.assign(_Result, {
  Header: Object.assign(_ResultHeaderWrapper, {
    LevelName: _ResultLevelName,
    LevelIcon: _ResultLevelIcon,
    Detail: _ResultDetail,
  }),
  Progress: Object.assign(_ResultProgressWrapper, {
    Labels: Object.assign(_ResultProgressLabels, {
      Name: _ResultProgressName,
      Label: _ResultProgressLabel,
    }),
    Bar: Object.assign(_ResultProgressBackground, {
      Overlay: _ResultProgressOverlay,
    }),
  }),
  Text: Object.assign(_ResultTextWrapper, {
    Label: _ResultTextLabel,
  }),
  Footer: Object.assign(_ResultFooterWrapper, {
    EstimatedDate: Object.assign(_ResultEstimatedDate, {
      Text: _ResultEstimatedDateText,
    }),
    DownloadBtn: _ResultDownloadBtn,
  }),
})
