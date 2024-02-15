import React from 'react'
import styles from "./chat.module.css"

const Window = () => {
    return (
        <div className={styles.container}>
            <div className={styles.chatHeader}>
                <div className={styles.logo}>
                    <img src="https://cdn-icons-png.flaticon.com/512/14292/14292687.png" alt="cwt" />
                </div>
                <div className={styles.chatTitle}>Let's Chat</div>
            </div>
            <div className={styles.chatBody}>Message here</div>
            <div className={styles.chatInput}>
                <div className={styles.inputSection}>
                    <input type="text" id={styles.textInput} autoFocus placeholder='Type here...' />
                </div>
                <div className={styles.send}>
                    <img src="https://cdn-icons-png.flaticon.com/512/11105/11105622.png" height={30} width={40} alt="send" />
                </div>
            </div>
        </div>
    )
}

export default Window