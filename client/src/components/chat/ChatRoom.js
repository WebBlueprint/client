import React from 'react';

function ChatRoom({ pro, onRemove }) {
    const chatRoomStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ddd', // Border style
        borderRadius: '8px', // Border radius
        padding: '10px', // Padding
        margin: '5px', // Margin
        cursor: 'pointer',
    };

    const closeButtonStyle = {
        marginLeft: '10px',
        padding: '5px',
        cursor: 'pointer',
    };

    const handleRemove = () => {
        onRemove(pro);
    };

    return (
        <div style={chatRoomStyle}>
            <span>{pro}</span>
            <span style={closeButtonStyle} onClick={handleRemove}>x</span>
        </div>
    );
}

export default ChatRoom;
