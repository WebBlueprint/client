import React, { useState, useEffect, useRef } from 'react';
import ChatRooms from './ChatRooms'; // Import the ChatRooms component
import axios from 'axios';

function ChatSearch({ onChatRoomClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedPros, setSelectedPros] = useState([]); // New state to store selected pros
    const [proList, setProList] = useState([]); // Initialize as an empty array
    const filteredProList = proList.filter(pro => pro && pro.toLowerCase().includes(searchTerm.toLowerCase()));
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);


    const resultContainerStyle = {
        maxHeight: '200px',
        overflow: 'hidden',
        width: '100%',
    };

    const inputStyle = {
        width: '100%',
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

    const handleResultClick = (pro) => {
        setIsInputFocused(true);
        setSearchTerm(pro);

        // Check if the pro is already selected before adding
        if (!selectedPros.includes(pro)) {
            // Add the selected pro to the list
            setSelectedPros(prevSelectedPros => [...prevSelectedPros, pro]);
        }
    };

    // Ref for the input element
    const inputRef = useRef(null);

    // Fetch all pros from the database
    useEffect(() => {
        const fetchAllPros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getallpros', [], {
                    withCredentials: true,
                });
                const allPros = response.data.map(pro => pro.name);
                setProList(allPros);
                console.log("모든프로들", allPros)
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

    const handleRemoveChatRoom = (proToRemove) => {
        const updatedPros = selectedPros.filter(pro => pro !== proToRemove);
        setSelectedPros(updatedPros);
    };


    const handleChatRoomClick = (pro) => {
        setSelectedChatRoom(pro);
        onChatRoomClick(pro);
        // ... other actions, like fetching chat history
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: '1' }}>
                {/* 검색 창 */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="프로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    style={inputStyle}
                />
                {/* 결과 표시 */}
                {isInputFocused && (
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
                                onClick={(e) => {
                                    handleResultClick(pro);
                                }}
                            >
                                {pro}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ flex: '2' }}>
                {/* Display selected pros in the ChatRooms component */}
                <ChatRooms selectedPros={selectedPros} onRemove={handleRemoveChatRoom} handleChatRoomClick={handleChatRoomClick} />
            </div>
        </div>
    );
}

export default ChatSearch;
