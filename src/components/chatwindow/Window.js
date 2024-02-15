import React, { useEffect, useRef, useState } from 'react'
import styles from "./chat.module.css"
import 'animate.css';


const Window = ({ inputValue, setInputValue, sendMessage, messages, handleEnter }) => {
    const [collapse, setCollapase] = useState(true);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current.scrollHeight > 0) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages])

    function toggleCollapse() {
        setCollapase(!collapse);
    }

    return (
        <div className={`${styles.container} ${collapse ? styles.collapse : ''}`}>
            <div className={styles.chatHeader} onClick={toggleCollapse}>
                <div className={styles.logo}>
                    <img src="https://cdn-icons-png.flaticon.com/512/14292/14292687.png" alt="cwt" />
                </div>
                <div className={styles.chatTitle}>Let's Chat</div>
            </div>
            <div className={styles.chatBody} ref={chatBodyRef}>
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
    )
}

export default Window