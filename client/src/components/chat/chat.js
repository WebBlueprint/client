import LessonsHeader from '../block/Header/Header.jsx'
import { useContext, useEffect } from 'react'
import { AuthContext } from "../application/store/AuthContext.js"
import styled from "styled-components";
import socket from "./server.js"

const StyledHeader = styled.div`
position: relative;
top: 100px;
`

function Chat() {
  const { userinfo } = useContext(AuthContext);
  console.log("chat.js" + userinfo)

  useEffect(() => {
    askUserName()
  }, [])

  const askUserName = () => {
    const answer = prompt("are you ready to chat? type 'yes'")
    if (answer === "yes") {
      socket.emit("login", userinfo.email, (res) => {
        console.log("res", res)
      })
    }
  }

  return (<>
    <StyledHeader>
      <LessonsHeader />
    </StyledHeader>
    <div>

    </div>
  </>
  );
}

export default Chat;


