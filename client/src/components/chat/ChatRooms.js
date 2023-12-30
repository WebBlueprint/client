import React from 'react';
import ChatRoom from './ChatRoom';

function ChatRooms(props) {
  const handleRemove = (pro) => {
    // Call the parent's onRemove function
    if (props.onRemove) {
      props.onRemove(pro);
    }
  };

  return (
    <div>
      <h3>채팅방</h3>
      <ul>
        {props.selectedPros.map((pro, index) => (
          <ChatRoom key={index} pro={pro} onRemove={() => handleRemove(pro)} />
        ))}
      </ul>
    </div>
  );
}

export default ChatRooms;
