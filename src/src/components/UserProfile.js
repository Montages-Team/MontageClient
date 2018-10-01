import { h } from 'hyperapp'
import picostyle from 'picostyle'

const ps = picostyle(h)

export default (state, action) => {
  const Wrapper = ps("div")({
  })

  const Descripton = ps("div")({
    padding: "0px 10px 0px 10px",
  })

  const UserName = ps("p")({
    color: "#444",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  })

  const FollowInfo = ps("div")({
    textAlign: "center",
    background: "white",
    display: "block",
    marginTop: "10px",
    padding: "5px 0px",
  })

  return (
    <Wrapper>
      <img src="https://s3.amazonaws.com/hiphopdx-production/2014/12/DAngelo-Sugah-Daddy.jpg"/>
      <Descripton>
        <UserName>
          D'Angelo
        </UserName>
        I'm a genius. My works are here.
      </Descripton>
      <FollowInfo>
        フォロー 0 フォロワー 0
      </FollowInfo>
    </Wrapper>
  )
}