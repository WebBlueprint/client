import LessonsHeader from '../block/Header/Header.jsx'
import styled from "styled-components";
import socket from "./server.js"

const StyledHeader = styled.div`
position: relative;
top: 100px;
`

function Chat() {
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


