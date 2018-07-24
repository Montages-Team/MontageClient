import { h } from 'hyperapp'
import picostyle from 'picostyle'

const ps = picostyle(h)

const ContentWrapper = ps("div")({
  margin: "0 auto",
  marginTop: "30px",
  width: "74vw",
  borderRadius: "3px",
  color: "#555",
})

export default (state, action) => {
  return (
    <ContentWrapper>
      <footer class="footer mr-auto">
      <div class="has-text-centered">
        <nav class="level">
          <p class="level-item"><a>Montageとは</a></p>
          <p class="level-item"><a>よくある質問</a></p>
          <p class="level-item"><a>利用規約</a></p>
          <p class="level-item"><a>プライバシーポリシー</a></p>
          <p class="level-item"><a>退会する</a></p>
        </nav>
        <small>Powered by Montage</small>
      </div>
    </footer>
  </ContentWrapper>
  )
}