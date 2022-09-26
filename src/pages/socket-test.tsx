import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

let socket: any

const serverURL: string = process.env.NEXT_PUBLIC_WS_SERVER_URL ?? ''

const Home = () => {
  const [input, setInput] = useState('')

  const socketInitializer = async () => {
    socket = io(serverURL, {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    })

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg: React.SetStateAction<string>) => {
      setInput(msg)
    })

    socket.on('hello', (data: string) => {
      console.log('message: ', data)
    })
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  const onChangeHandler = (e: any) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  )
}

export default Home
