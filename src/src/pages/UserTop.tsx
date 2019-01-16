import { h } from 'hyperapp'
import picostyle from 'picostyle'

const ps = picostyle(h)
const primary = "#B464A3"

export default (state: object, action: object) => {
  const Wrapper = ps("div")({
    paddingTop: "75px",
	  "@media (max-width: 770px)": {
      paddingTop: "60px",
    }
  })

  const ContentWrapper = ps("div")({
    margin: "0 auto",
    width: "68vw",
    height: "100%",
    color: "#555",
	  "@media (max-width: 770px)": {
      width: "100vw"
    }

  })

  const Heading = ps("p")({
    fontSize: "2.8vh",
    fontWeight: "bold",
    borderBottom: `solid 3px ${primary}`,
  })

  const LeftColumn = ps("div")({
    display: "block",
    position: "fixed",
    background: "white",
    float: "left",
    width: "16%",
    wordWrap: "break-word",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "1px 1px 2px #ccc",
    "@media (max-width: 770px)": {
      display: "block",
      float: "none",
      width: "100%",
      position: "relative",
      marginBottom: "10px"
    },
  })

  const UserName = ps("p")({
    fontWeight: "bold"
  })
  const ProfileArea = ps("div")({
    textAlign: "center",
    padding: "10px 0px 20px 0px",
  })

  const RightColumn = ps("div")({
    display: "block",
    background: "white",
    float: "right",
    width: "75%",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "1px 1px 2px #ddd",
    "@media (max-width: 770px)": {
      display: "block",
      float: "none",
      position: "relative",
      width: "100%",
    },
  })
  const Questions = ps("div")({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridTemplateRows: "1fr 1fr",
    gridGap: "30px",
    marginBottom: "30px"
  })
  const QuestionWrapper = ps("div")({
    display: "block",
  })
  const QuestionText = ps("p")({
    margin: "0px",
    padding: "0px",
    gridColumn: "1/3"
  })
  const AnswerButton = ps("button")({
    marginTop: "10px",
    padding: "1px 0px",
    width: "100%",
    fontSize: "80%",
    outline: "0px",
    border: `1px solid ${primary}`,
    borderRadius: "5px",
    color: `#AA1D81`,
    background: "white"
  })
  const NewQuestionForm = ps("input")({
    display: "block",
    width: "100%",
    padding: "5px 10px",
    borderRadius: "5px",
    background: "white",
    outline: "none",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "95%"
  })
  const AnswerText = ps("p")({
    position: "relative",
    marginTop: "10px",
    marginLeft: "20px",
    padding: "10px 25px",
    borderRadius: "10px",
    background: "#eee",
    width: "auto",
    float: "left",
    "::before": {
      position: "absolute",
      content: '""',
      border: "10px solid transparent",
      top: "15px",
      left: "-20px"
    },
    "::after": {
      position: "absolute",
      content: '""',
      border: "10px solid transparent",
      borderRight: "10px solid #eee",
      top: "15px",
      left: "-19px"
    }
  })
  const ProfileImage = ps('img')({
    width: "48px",
    display: "block",
    float: "left",
    marginTop: "15px",
    borderRadius: "5px"
  })
  const ProfileQuestionWrapper = ps('div')({
    display: "grid",
    gridTemplateColumns: "50px 1fr"
  })
  const CollageButton = ps('span')({
    display: "block",
    color: `${primary}`,
    float: "right",
    marginTop: "10px",
    fontSize: "80%",
    padding: "2px 5px",
    borderRadius: "5px",
    border: `${primary} 1px solid`,
    marginLeft: "10px"
  })
  const ButtonsArea = ps('div')({
    display: "block"
  })
  return (
    <Wrapper>
      <ContentWrapper class="clearfix">
        <LeftColumn>
          <img id="profile" src="http://kalamu.com/neogriot/wp-content/uploads/2016/11/prince-02.jpg"/>
          <ProfileArea>
            <UserName>Prince</UserName>
            <p>@mynameisprince</p>
            Follow: <a href="#">10</a> Follower: <a href="#">10</a>
          </ProfileArea>
        </LeftColumn>
        <RightColumn class="clearfix">
          <Heading class="mb15">Princeに質問する</Heading>
          <Questions>
          <QuestionWrapper>
              <QuestionText>
                ここに質問を表示する
                ここに質問を表示する
              </QuestionText>
              <AnswerButton>
                回答する
              </AnswerButton>
            </QuestionWrapper>
            <QuestionWrapper>
              <QuestionText>
                ここに質問を表示する
                ここに質問を表示する
              </QuestionText>
              <AnswerButton>
                回答する
              </AnswerButton>
            </QuestionWrapper>
            <QuestionWrapper>
              <QuestionText>
                ここに質問を表示する
                ここに質問を表示する
              </QuestionText>
              <AnswerButton>
                回答する
              </AnswerButton>
            </QuestionWrapper>
            <QuestionWrapper>
              <QuestionText>
                ここに質問を表示する
                ここに質問を表示する
              </QuestionText>
              <AnswerButton>
                回答する
              </AnswerButton>
            </QuestionWrapper>
          </Questions>
          <Heading class="mb15">Princeへの質問と回答</Heading>
          <NewQuestionForm class="clearfix" type="text" placeholder="新しい質問をつくりましょう"/>
          <ProfileQuestionWrapper>
            <QuestionText class="clearfix">
              Q. いままで何カ国を旅したことがありますか？
            </QuestionText>
            <ProfileImage src="http://kalamu.com/neogriot/wp-content/uploads/2016/11/prince-02.jpg" />
            <AnswerText>
              ハワイ、カナダ、オーストラリアの3カ国です！！<br />
              ほかにもいろんな国にいきたいなぁ〜〜
            </AnswerText>
          </ProfileQuestionWrapper>
          <ButtonsArea class="clearfix">
            <CollageButton>すべての回答</CollageButton>
            <CollageButton>回答する</CollageButton>
          </ButtonsArea>
          hoge
        </RightColumn>
      </ContentWrapper>
    </Wrapper>
  )
}
