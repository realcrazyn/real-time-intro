import { useEffect, useState } from 'react'
import axios from 'axios'

const LongPulling = () => {
  const [messages, setMesages] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    try {
      let { data } = await axios.get('http://localhost:5000/get-messages')
      setMesages((prev) => [data, ...prev])
      await subscribe()
    } catch (e) {
      setTimeout(() => {
        subscribe()
      }, 500)
    }
  }

  const sendMessage = async () => {
    const res = await axios.post(
      'http://localhost:5000/send_message',
      {
        text: value,
        id: Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-transform',
        },
      }
    )
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LongPulling
