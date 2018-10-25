import { h } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'
import picostyle from 'picostyle'
import Header from './components/Header'
import Footer from './components/Footer'
import UserTop from './pages/UserTop'
import Home from './pages/Home'

const ps = picostyle(h)

export default (state, action) => {
  const Wrapper = ps("div")({
    display: "block",
    padding: "none",
    margin: "0 none",
  })

  return (
    <Wrapper>
      <Header/>
      <Route path="/" render={Home} />
      <Route path="/user" render={UserTop} />
      <Footer/>
    </Wrapper>
  )
}
