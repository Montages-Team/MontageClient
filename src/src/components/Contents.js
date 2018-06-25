import { h } from 'hyperapp';
import picostyle from "picostyle";
import Header from './Header';
import Toppage from './Toppage';
const ps = picostyle(h)

export default (state, action) => {
  const Wrapper = ps("div")({
    display: "block",
    padding: "none",
    margin: "none",
  })

  return (
    <Wrapper>
      <Header/>
      <Toppage/>
    </Wrapper>
  )
}