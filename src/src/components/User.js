import { h } from 'hyperapp'
import picostyle from 'picostyle'

const ps = picostyle(h)
const primary = "#B464A3"

export default (state, action) => {
  const Wrapper = ps("div")({
    padding: "20px",
    marginBottom: "5px",
    background: "white",
    boxShadow: "1px 1px 1px #DDD",
  })

  return (
    <Wrapper>
      新しい質問をする
    </Wrapper>
  )
}