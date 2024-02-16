import React, { useEffect, useRef, useState } from 'react';
import styles from "./chat.module.css";
import 'animate.css';

// Window component for displaying chat interface
const Window = ({ inputValue, setInputValue, sendMessage, messages, handleEnter, users }) => {

    // State to control chat collapse/expand
    const [collapse, setCollapse] = useState(true);

    // Reference to the chat body element for scrolling
    const chatBodyRef = useRef(null);

    // Effect to scroll chat to bottom when new messages are received
    useEffect(() => {
        if (chatBodyRef.current.scrollHeight > 0) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to toggle chat collapse/expand
    function toggleCollapse() {
        setCollapse(!collapse);
    }

    return (
        <div className={`${styles.container} ${collapse ? styles.collapsed : ''}`}>
            <div className={styles.chatHeader} onClick={toggleCollapse}>
                <div className={styles.logo}>
                    <img src="https://cdn-icons-png.flaticon.com/512/14292/14292687.png" alt="cwt" />
                </div>
                <div className={styles.chatTitle}>Let's Chat</div>
            </div>
            <div className={styles.chatBody} ref={chatBodyRef}>
                <div className={styles.userList}>
                    {/* Display user list */}
                    <p>{users.length} users joined</p>
                    {
                        users.map((user) => (
                            <div key={user}>{user}</div>
                        ))
                    }
                </div>
                {/* Display chat messages */}
                {messages.map((message, index) => (
                    <div key={index} className={message.type === 'outgoing' ? `${styles.outgoing} animate__animated animate__fadeInLeft animate__faster` : `${styles.incoming} animate__animated animate__fadeInRight animate__faster`}>{message.content}</div>
                ))}
            </div>
            <div className={styles.chatInput}>
                <div className={styles.inputSection}>
                    <input type="text"
                        id={styles.textInput}
                        value={inputValue}
                        autoFocus
                        placeholder='Type here...'
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                </div>
                <div className={styles.send} onClick={sendMessage}>
                    <img src="https://cdn-icons-png.flaticon.com/512/11105/11105622.png" height={30} width={40} alt="send" />
                </div>
            </div>
        </div>
    );
}

export default Window;
