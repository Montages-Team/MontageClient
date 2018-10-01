import { h } from 'hyperapp';
import { Route } from '@hyperapp/router'
import picostyle from "picostyle";

const ps = picostyle(h)

export default (state, action) => {
  const Header = ps("div")({
    zIndex: "1",
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
    width: "68vw",
    margin: "auto",
  })

  const LeftWrapper = ps("div")({
    display: "block",
    height: "50px",
    width: "auto",
    float: "left",
    textAlign: "center",
    paddingLeft: "15px"
  })

  const RightWrapper = ps("div")({
    display: "block",
    height: "50px",
    float: "right",
    marginTop: "10px",
    width: "auto"
  })

  const Logo = ps("a")({
    display: "inline-block",
    fontSize: "3vh",
    fontWeight: "bold",
    fontFamily: "Pacifico, Gerogia, Times, serif",
    color: "white",
    textAlign: "left",
    lineHeight: "50px",
    ":hover": {
      color: "#444"
    }
  })

  const HomeHeader = () =>
  <Wrapper class="is-clearfix">
  <LeftWrapper class="is-pulled-left" id="header-left">
    <Logo id="logo">Montage</Logo>
  </LeftWrapper>
  <RightWrapper class="desktop is-pulled-right" id="header-right">
    <nav class="level">
      <div class="level-right">
      <div class="level-item">
      <div class="field has-addons">
        <p class="control">
          <input class="input is-small" type="text" placeholder="アカウント名・ID"/>
        </p>
        <p class="control">
          <button class="button is-small">
            検索
          </button>
        </p>
      </div>
    </div>
        <p class="level-item"><button class="button is-small">ログイン</button></p>
        <p class="level-item"><button class="button is-small">新規登録</button></p>
      </div>
    </nav>
  </RightWrapper>
</Wrapper>

  return (
    <Header>
      <Route path="/" render={HomeHeader}/>
      <Route path="/user" render={HomeHeader} />
    </Header>
  )
}