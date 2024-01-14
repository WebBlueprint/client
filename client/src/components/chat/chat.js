import React, { useState, useEffect, useRef, useContext } from "react";
import socket from "./server";
import styled from "styled-components";
import { AuthContext } from "../application/store/AuthContext"

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
`;

const MessagesContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow-y: scroll;
  height: 600px;
`;

const MessageItem = styled.li`
  list-style-type: none;
  margin-bottom: 5px;
  text-align: ${(props) => (props.isCurrentUser ? "right" : "left")};
`;
const Username = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const ChatForm = styled.form`
  display: flex;
  margin-top: 10px;
  align-items: center
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
`;

const SendButton = styled.button`
  padding: 7px 10px;
  background-color: #1B4607;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  height: 80%;
  width: 100px
`;

const Chat = ({ selectedChatRoom }) => {
    const { userinfo } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [username, setUsername] = useState('exampleUser'); // Set the default username
    const messagesRef = useRef(null);
    const chatInputRef = useRef(null);

    console.log("Selected chat room:", selectedChatRoom)


    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        setUsername(userinfo.email)
        socket.emit("setUsername", username);
    }, [username]);

    useEffect(() => {
        console.log("useEffect triggered with selectedChatRoom:", selectedChatRoom); // 추가
        socket.emit("joinChatRoom", selectedChatRoom); // 채팅방에 참여
    }, [selectedChatRoom])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput === "") {
            return false;
        }
        socket.emit('sendMessage', {
            username,
            content: messageInput,
            chatRoom: selectedChatRoom, // Include the chat room name
        });
        setMessageInput('');

        if (chatInputRef.current) {
            chatInputRef.current.focus();
        }
    };

    return (
        <ChatContainer>
            <MessagesContainer ref={messagesRef}>
                <ul>
                    {messages.map((message, index) => (
                        <MessageItem key={index} isCurrentUser={message.username === username}>
                            <Username>{message.username}:</Username> {message.content}
                        </MessageItem>
                    ))}
                </ul>
            </MessagesContainer>
            <ChatForm onSubmit={sendMessage}>
                <ChatInput
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    ref={chatInputRef}
                />
                <SendButton type="submit">Send</SendButton>
            </ChatForm>
        </ChatContainer>
    );
};

export default Chat;