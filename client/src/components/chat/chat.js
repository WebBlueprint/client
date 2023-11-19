import LessonsHeader from '../block/Header/Header.jsx'
import styled from "styled-components";

const StyledHeader = styled.div`
position: relative;
top: 100px;
`

function Chat() {
  return (
    <StyledHeader>
      <LessonsHeader />
    </StyledHeader>
  );
}

export default Chat;


