import { h } from "hyperapp";
import picostyle from 'picostyle';

const ps = picostyle(h)

export default (state: object, action: object) => {
  const Wrapper = ps("div")({
    paddingTop: "75px"
  })

  const ContentWrapper = ps("div")({
    margin: "0 auto",
    width: "74vw",
    height: "100%",
    borderRadius: "3px",
    color: "#555",
  })

  const MontageMark = ps("div")({
    background: "linear-gradient(#B464A3,#807DBA)",
    borderRadius: "50%",
    margin: "20px auto",
    width: "20vh",
    height: "20vh",
  })

  const MontageSan = ps("img")({
    marginTop: "19%",
    width: "60%",
    height: "60%",
  })

  const CatchCopy = ps("p")({
    fontSize: "2.7vh",
    fontWeight: "bold",
  })

  const Heading = ps("h1")({
    fontSize: "2.3vh",
    borderBottom: "2px solid #fafafa",
    marginBottom: "10px",
    textAlign: "center",
  })

  const ButtonsArea = ps("div")({
    textAlign: "center"
  })

  const NewReg = ps("p")({
    display: "block",
    textAlign: "center",
    textDecoration: "underline",
  })
  const VerticalSpacer = ps("div")({
    display: "block",
    margin: "30px 0px"
  })

  return (
    <Wrapper>
      <ContentWrapper>
      <div class="columns">
        <div class="column is-half has-text-centered">
          <MontageMark>
            <MontageSan
              src="https://1.bp.blogspot.com/-Oj1kdRN-f3A/Wzm6njg1V4I/AAAAAAAABYk/AQiC2wwyvBMeAraoqoDReXymOLVlKZJGgCLcBGAs/s320/default.png"
              id="montage-icon"
              alt="montage"/>
          </MontageMark>
          <CatchCopy>友達も好きな人も自由にいじろう</CatchCopy>
            匿名で本音もネタも徒然なるままに<br/>アンサイクロペディアのようなプロフィール帳
         </div>
        <div class="column is-half pb40">
        <Heading>ユーザを検索する</Heading>
          <input class="input m-r-5" type="text" placeholder="アカウント名かIDを入力してください"/>
          <VerticalSpacer/>
          <Heading>ログイン・新規登録</Heading>
          <ButtonsArea>
            <a class="button is-primary is-fullwidth mb10">
                <span class="icon">
                <img
                  class="icon"
                  src="https://1.bp.blogspot.com/-Oj1kdRN-f3A/Wzm6njg1V4I/AAAAAAAABYk/AQiC2wwyvBMeAraoqoDReXymOLVlKZJGgCLcBGAs/s320/default.png"
                  />
                </span>
                <span>Montageアカウントでログイン</span>
            </a>
            <a class="button is-info is-fullwidth mb10 ">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span>Twitterアカウントでログイン</span>
            </a>
            <NewReg>
              <a href="#">アカウントを新規登録する</a>
            </NewReg>
          </ButtonsArea>
        </div>
      </div>
      </ContentWrapper>
    </Wrapper>
  )
}