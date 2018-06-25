import { h } from 'hyperapp';
import picostyle from "picostyle";
const ps = picostyle(h)

export default (state, action) => {
  const Header = ps("div")({
    display: "block",
    width: "100%",
    height: "50px",
    background: "linear-gradient(#B464A3,#807DBA)",
    position: "fixed",
    boxShadow: "1px 2px 5px #AAA",
    textAlign: "center",
  })

  const Wrapper = ps("div")({
    display: "block",
    width: "90vw",
    margin: "auto",
  })

  const LeftWrapper = ps("div")({
    display: "block",
    height: "50px",
    float: "left",
  })

  const RightWrapper = ps("div")({
    display: "block",
    height: "50px",
    float: "right",
    marginTop: "10px",
  })

  const Logo = ps("a")({
    display: "inline-block",
    float: "left",
    fontSize: "3vh",
    fontWeight: "bold",
    fontFamily: "Pacifico, Gerogia, Times, serif",
    color: "white",
    lineHeight: "50px",
    ":hover": {
      color: "#444"
    }
  })

  const Ml = ps("div")({
    padding: "1000px"
  })

  return (
    <Header>
      <Wrapper>
        <LeftWrapper>
          <Logo>Montage</Logo>
        </LeftWrapper>
        <RightWrapper>
          <a class="button is-small">ログイン</a>
          <a class="button is-small Ml">新規登録</a>
        </RightWrapper>
      </Wrapper>
    </Header>
  )
}