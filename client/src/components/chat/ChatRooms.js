import React, { useState } from 'react';
import ChatRoom from './ChatRoom';
import styled from 'styled-components';


const StyledDiv = styled.div`
  border: 1px solid #1b4607; /* 초록색 테두리 설정 */
  border-radius: 30px;
  padding: 20px;
  height: 70%;
`;

const StyledUl = styled.ul`
  display: column; /* 수평 정렬을 위해 flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%;
  padding: 0
`;

function ChatRooms(props) {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);

  const handleRemove = (pro) => {
    // Call the parent's onRemove function
    if (props.onRemove) {
      props.onRemove(pro);
    }
  };

  const handleChatRoomClick = (pro, index) => {
    setSelectedRoomIndex(index);
    props.handleChatRoomClick(pro);
  };

  return (
    <StyledDiv>

      <StyledUl>
        {props.selectedPros.map((pro, index) => (
          <ChatRoom
            key={index}
            pro={pro}
            onClick={() => handleChatRoomClick(pro, index)}
            onRemove={() => handleRemove(pro)}
            isSelected={index === selectedRoomIndex} // Pass whether the ChatRoom is selected or not
          />
        ))}
      </StyledUl>
    </StyledDiv>
  );
}

export default ChatRooms;
