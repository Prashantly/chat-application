import { useState, useEffect } from "react";
import Window from "./components/chatwindow/Window";
import io from "socket.io-client";

const socket = io('http://localhost:3001')

function App() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages([...messages, { content: data.message, type: 'incoming' }])
    })

    socket.on('user_list', (userList) => {
      setUsers(userList)
    })

  }, [messages])

  const handleEnter = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      socket.emit("send_message", { message: inputValue })
      setMessages([...messages, { content: inputValue, type: 'outgoing' }])
      setInputValue('')
    }
  }

  const sendMessage = () => {
    //emit some event so that other client can listen to this event
    // "send_message" is an event
    if (inputValue.trim() !== '') {
      socket.emit("send_message", { message: inputValue })
      setMessages([...messages, { content: inputValue, type: 'outgoing' }])
      setInputValue('')
    }
  }

  return (
    <Window
      inputValue={inputValue}
      setInputValue={setInputValue}
      sendMessage={sendMessage}
      messages={messages}
      handleEnter={handleEnter}
      users={users}
    />
  );
}

export default App;
