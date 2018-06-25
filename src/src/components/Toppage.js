import { h } from 'hyperapp';
import picostyle from "picostyle";
const ps = picostyle(h)

export default (state, action) => {
  const Wrapper = ps("div")({
    paddingTop: "60px"
  })

  const MainCulmn = ps("div")({
    background: "white",
    margin: "0 auto",
    width: "90vw",
    borderRadius: "3px"
  })

  const ContentWrapper = ps("div")({
    padding: "20px",
    color: "#555",
  })

  return (
    <Wrapper>
      <MainCulmn>
        <ContentWrapper>
          こんにちは、わたしはMontageです
        </ContentWrapper>
      </MainCulmn>
    </Wrapper>
  )
}