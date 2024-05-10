import React, { useState } from 'react';

function ChatRoom({ pro, onRemove, onClick, isSelected }) {
    const chatRoomStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ddd', // Border style
        borderRadius: '8px', // Border radius
        padding: '10px', // Padding
        margin: '5px', // Margin
        cursor: 'pointer',
        backgroundColor: isSelected ? '#DDE3DA' : 'transparent', // Apply different background color if selected
    };

    const closeButtonStyle = {
        marginLeft: '10px',
        padding: '5px',
        cursor: 'pointer',
    };

    const handleRemove = (e) => {
        e.stopPropagation(); // Prevent the onClick of the parent div from firing
        onRemove(pro);
    };

    const handleClick = () => {
        onClick(pro);
    };

    return (
        <div style={chatRoomStyle} onClick={handleClick}>
            <span>{pro}</span>
            <span style={closeButtonStyle} onClick={handleRemove}>x</span>
        </div>
    );
}

export default ChatRoom;
