import React from 'react'
import FileList from './FileList'

const Home = ({ roomCode, setRoomCode }) => {
  return (
    <div className='container max-w-[380px] h-[600px] flex flex-col justify-between max-sm:max-w-full max-sm:h-full shadow-xl max-sm:shadow-none bg-white p-4 rounded-xl'>
        <div className="header flex justify-between">
            <div className="logo font-bold text-xl max-sm:text-2xl ">Share<span className='bg-slate-600 rounded text-white font-medium px-[3px] ml-[2px]'>Hub</span></div>
            <div className="room-card flex gap-2 ">
                <div className="room-code text-xl font-bold">{roomCode}</div>
                <button className="exit px-2 py-1 rounded bg-red-200 text-red-500 hover:bg-red-400 hover:text-white"
                onClick={()=> setRoomCode(null)}>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>

        <p className='font-semibold mt-4 mb-2'>Your Files:</p>

        <div className="relative file-container h-full">
          <FileList roomCode={roomCode}/>
        </div>

    </div>
  )
}

export default Home