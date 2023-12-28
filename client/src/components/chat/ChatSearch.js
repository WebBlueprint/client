import React, { useState } from 'react';

function ChatSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const proList = ["승우", "승연", "민지", "민철", "윤철", "윤철이사촌동생", "대한이형", "대한이누나", "주한", "재윤"];

    const filteredProList = proList.filter(pro => pro.toLowerCase().includes(searchTerm.toLowerCase()));

    const resultContainerStyle = {
        maxHeight: '200px', // 원하는 최대 높이 설정
        overflow: 'hidden',
        width: '100%', // input 필드와 같은 너비로 설정
    };

    const inputStyle = {
        width: '100%', // 전체 너비를 차지하도록 설정
    };

    const resultStyle = {
        backgroundColor: '#f0f0f0', // 기본 배경색
        padding: '10px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%', // input 필드와 같은 너비로 설정
        boxSizing: 'border-box', // 패딩과 테두리가 너비에 포함되도록 설정
    };

    const resultHoverStyle = {
        backgroundColor: '#e0e0e0', // 호버 배경색
    };

    const handleResultClick = (pro) => {
        setIsInputFocused(true);
        setSearchTerm(pro);

    };

    return (
        <div>
            {/* 검색 창 */}
            <input
                type="text"
                placeholder="프로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={inputStyle} // 스타일 적용
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
                            onClick={() => handleResultClick(pro)} // 클릭 시 검색어 자동 완성
                        >
                            {pro}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatSearch;
