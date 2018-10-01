import { h } from 'hyperapp';
import { Link, Route, location } from '@hyperapp/router'
import picostyle from 'picostyle'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

import Header from './components/Header'
import Footer from './components/Footer'
import UserTop from './pages/UserTop'
import Home from './pages/Home'

const ps = picostyle(h)
const client = new ApolloClient({
  uri: "https://montage-graphql-api.herokuapp.com/gql/"
})

client
  .query({query: gql`
  {
  users{
    username
  }
    }`})
  .then(result => {
    console.log(result.data.users.map(user=>user.username))
  })

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
