import { useState, useEffect } from "react";
import Window from "./components/chatwindow/Window";
import io from "socket.io-client";

// Establish socket connection with the server
const socket = io('http://localhost:3001')

function App() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Effect hook to handle incoming messages and user list updates
  useEffect(() => {

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages([...messages, { content: data.message, type: 'incoming' }])
    })

    // Listen for updates to the list of online users
    socket.on('user_list', (userList) => {
      setUsers(userList)
    })

    // Clean up function to remove event listeners when component unmounts
    return () => {
      socket.off('receive_message');
      socket.off('user_list');
    };

  }, [messages])

  // Function to handle "Enter" key press for sending messages
  const handleEnter = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // Emit a message to the server
      socket.emit("send_message", { message: inputValue })

      // Update local state with the outgoing message
      setMessages([...messages, { content: inputValue, type: 'outgoing' }])

      // Clear the input field
      setInputValue('')
    }
  }

  const sendMessage = () => {
    //emit some event so that other client can listen to this event
    // "send_message" is an event
    if (inputValue.trim() !== '') {
      // Emit a message to the server
      socket.emit("send_message", { message: inputValue })
      // Update local state with the outgoing message
      setMessages([...messages, { content: inputValue, type: 'outgoing' }])
      // Clear the input field
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
