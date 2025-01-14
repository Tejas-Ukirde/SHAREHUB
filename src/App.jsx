import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Room from './components/Room'

function App() {

  const [roomCode, setRoomCode] = useState(null)

  return (
    <div className="app h-[100svh] bg-slate-100 grid place-items-center">
      {roomCode ? (<Home roomCode={roomCode} setRoomCode={setRoomCode}/>)
       : (<Room roomCode={roomCode} setRoomCode={setRoomCode}/>) }
    </div>
  )
}

export default App
