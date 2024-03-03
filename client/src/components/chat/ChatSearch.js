import React, { useState, useEffect, useRef } from 'react';
import ChatRooms from './ChatRooms'; // Import the ChatRooms component
import axios from 'axios';
import styled from 'styled-components';
import 사진 from "./윤승우사진.png"


const userInfoStyle = {
    width: '100%',
    height: '150px',
    backgroundColor: '#D9D9D9',
    borderRadius: '30px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
};

const profilePictureStyle = {
    position: "relative",
    right: '20px',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    marginRight: '10px',
};

const userNameStyle = {
    position: "relative",
    top: "5px",
    right: '5px',
    fontWeight: 'bold',
    fontSize: '1.8rem',
};

const onlineStatusStyle = {
    marginTop: '5px',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'green', // Change the color based on your styling
};


const StyledButton = styled.button`
    background-color: #1b4607; /* 초록색 배경색 */
    color: white; /* 흰색 텍스트 */
    width: 100%; /* 좌우로 100% 너비 */
    height: 2rem;
    border-radius: 10px;
`;

const resultContainerStyle = {
    maxHeight: '200px',
    overflow: 'hidden',
    width: '100%',
};

const inputStyle = {
    width: '100%',
    padding: '20px',
    margin: '2px 0',
    marginTop: "15px"
};

const resultStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
};

const resultHoverStyle = {
    backgroundColor: '#e0e0e0',
};



function ChatSearch({ onChatRoomClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedPros, setSelectedPros] = useState([]); // New state to store selected pros
    const [proList, setProList] = useState([]); // Initialize as an empty array
    const filteredProList = proList.filter(pro => pro && pro.toLowerCase().includes(searchTerm.toLowerCase()));
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);

    const handleResultClick = (pro) => {
        setIsInputFocused(true);
        setSearchTerm(pro);

        // Check if the pro is already selected before adding
        if (!selectedPros.includes(pro)) {
            // Add the selected pro to the list
            setSelectedPros(prevSelectedPros => [...prevSelectedPros, pro]);
        }
        setSearchTerm("")
    };

    // Ref for the input element
    const inputRef = useRef(null);

    // Fetch all pros from the database
    useEffect(() => {
        const fetchAllPros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/allpros', [], {
                    withCredentials: true,
                });
                const allPros = response.data.map(pro => pro.name);
                setProList(allPros);
                console.log("모든프로들", allPros);
            } catch (error) {
                console.error('Error fetching pros:', error);
            }
        };

        fetchAllPros();
    }, []); // Empty dependency array ensures the effect runs only once

    // Add a click event listener to handle clicks outside the input and result container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsInputFocused(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Ensure that when isInputFocused changes, the input is focused
    useEffect(() => {
        if (isInputFocused) {
            inputRef.current.focus();
        }
    }, [isInputFocused]);

    // Ensure that when searchTerm changes, the result is displayed
    useEffect(() => {
        if (isInputFocused) {
            setHoveredIndex(null); // Reset hovered index when search term changes
        }
    }, [searchTerm, isInputFocused]);

    const handleRemoveChatRoom = (proToRemove) => {
        const updatedPros = selectedPros.filter(pro => pro !== proToRemove);
        setSelectedPros(updatedPros);
    };

    const handleNewChatClick = () => {
        setSearchTerm('');
        setTimeout(() => {
            setIsInputFocused(true);
        }, 0);
    };



    const handleChatRoomClick = (pro) => {
        setSelectedChatRoom(pro);
        onChatRoomClick(pro);
        // ... other actions, like fetching chat history
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: "center", padding: "15px" }}>

            <div style={userInfoStyle}>
                {/* Left side - Profile Picture */}
                <img src={사진} alt="Profile" style={profilePictureStyle} />

                {/* Right side - User Name and Online Status */}
                <div>
                    <div style={userNameStyle}>윤 승우</div>
                    <div style={onlineStatusStyle}>Online</div>
                </div>
            </div>


            {/* "New Chat" 버튼 */}
            {/* <StyledButton onClick={handleNewChatClick}>
                New Chat
            </StyledButton> */}
            <div style={{ flex: '1' }}>

                {/* 검색 창 */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add Your Pro"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    style={inputStyle}
                />

                {/* 결과 표시 */}

                <div style={resultContainerStyle}>
                    {filteredProList.map((pro, index) => (
                        <div
                            key={pro}
                            style={{
                                ...resultStyle,
                                ...(hoveredIndex === index && resultHoverStyle),
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => handleResultClick(pro)}
                        >
                            {pro}
                        </div>
                    ))}
                </div>

            </div>

            <div style={{ flex: '1.5', height: "100%" }}>
                {/* Display selected pros in the ChatRooms component */}
                <ChatRooms selectedPros={selectedPros} onRemove={handleRemoveChatRoom} handleChatRoomClick={handleChatRoomClick} />
            </div>
        </div>
    );
}

export default ChatSearch;


