import React, { useState } from 'react';
import ChatRoom from './ChatRoom';

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
    <div>
      <h3>채팅방</h3>
      <ul>
        {props.selectedPros.map((pro, index) => (
          <ChatRoom
            key={index}
            pro={pro}
            onClick={() => handleChatRoomClick(pro, index)}
            onRemove={() => handleRemove(pro)}
            isSelected={index === selectedRoomIndex} // Pass whether the ChatRoom is selected or not
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatRooms;
