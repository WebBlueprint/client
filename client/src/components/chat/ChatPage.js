import React from 'react';
import Chat from "./chat";
import ChatSearch from './ChatSearch';
import ChatRooms from './ChatRooms';
import styled from "styled-components";

const ChatPageContainer = styled.div`
  display: flex;
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  margin-top: 150px; /* Adjust the top margin as needed */
`;

const ChatSearchContainer = styled.div`
  flex-grow: 1.5;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
`;
const ChatContainer = styled.div`
  flex-grow: 6;
`;


const ChatSearchSection = styled.div`
  flex: 1; /* Set the flex proportion for ChatSearch */
  border-radius: 20px;
`;

const ChatRoomsSection = styled.div`
  flex: 2; /* Set the flex proportion for ChatRooms */
`;


const ChatPage = () => {
  return (
    <ChatPageContainer>
      <ChatSearchContainer>
        <ChatSearchSection>
          <ChatSearch />
        </ChatSearchSection>
        <ChatRoomsSection>
          <ChatRooms />
        </ChatRoomsSection>
      </ChatSearchContainer>
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </ChatPageContainer>
  );
}

export default ChatPage;
