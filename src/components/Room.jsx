import React, { useRef, useEffect } from 'react'
import {db, storage} from '../firebaseConfig'
import { ref, deleteObject  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { doc, collection, onSnapshot, query, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const Room = ({setRoomCode}) => {

  let currentDate = new Date();

  const roomInputRef = useRef(null)

  const filesRef = collection(db, "files");

  useEffect(()=>{
    const queryFiles = query(filesRef);
    const unsubscribe = onSnapshot(queryFiles, (snapshot)=>{
        snapshot.forEach((document) =>{
          let fileData = document.data()

          let fileUploadDate = fileData.uploadDate;
          
          if (currentDate.getDate() > fileUploadDate.date || 
              currentDate.getMonth() > fileUploadDate.month || 
              currentDate.getFullYear() > fileUploadDate.year){
                let fileRef = ref(storage, fileData.name);

                deleteObject(fileRef)
                  .then(() => {
                    console.log("Deleted File");
                    
                    deleteDoc(doc(db, "files", document.id))
                    .then(() => {
                      console.log("Deleted Doc " + document.id);
                    })
                    .catch((error) => {
                      console.error("Error deleting document: ", error);
                    });;
                  })
                  .catch((error) => {
                    console.error("Error deleting file: ", error);
                  });
                }
          })
    });
    return ()=> unsubscribe();
  }, [])

  return (
    <div className='container max-w-[380px] flex flex-col justify-between shadow-xl max-sm:shadow-none bg-white p-4 rounded-xl'>
      <div className="logo font-bold text-3xl max-sm:text-2xl text-center ">Share<span className='bg-slate-600 rounded text-white font-medium px-[3px] ml-[2px]'>Hub</span></div>
      <div className="desc text-center my-4">
        <h3 className='text-xl font-semibold text-slate-600 mb-7'>Simple and Secure File Transfer</h3>
        <p className='text-slate-900'>No Login/Signup Needed <br />Just Enter a same random room code on different devices and experience seamless file transfer.</p>
      </div>
      <form className="input mt-8 border-2 border-slate-600 w-full text-xl flex justify-between rounded-lg overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        setRoomCode(roomInputRef.current.value);
        console.log("Entered " + roomInputRef.current.value);
      }}>
        <input ref={roomInputRef} type="text" placeholder='Enter Room Code' className='w-48 border-none outline-none px-4' maxLength={6} />
        <button type='submit' className='bg-slate-600 text-white w-32 py-2'>
          <i class="fa-solid fa-arrow-right-to-bracket"></i> Enter
        </button>
      </form>

    </div>
  )
}

export default Room