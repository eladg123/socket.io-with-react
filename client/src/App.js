import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const sendMessage = () => {
    socket.emit('send_message', { message, room })
  }

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input
        placeholder="Type room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join room</button>
      <input
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Chat:</h1>

      <h3>{messageReceived}</h3>
    </div>
  )
}

export default App
