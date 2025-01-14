import React, { useEffect, useState } from 'react';
import FileItem from './FileItem';
import FileSelector from './FileSelector';
import {db, storage} from '../firebaseConfig'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const FileList = ({roomCode}) => {

  const [files, setFiles] = useState([])
  const [newFiles, setNewFiles] = useState([]);

  const filesRef = collection(db, "files");

  const handleFileUpload = async () => {

    for (let i = 0; i < newFiles.length; i++) {

      const newFile = newFiles[i];
      console.log('fileSelected ' + newFile.name);
  
      const storageRef = ref(storage, newFile.name);
      // const storageRef = ref(storage, roomCode + '/' + newFile.name);
  
      const uploadTask = await uploadBytesResumable(storageRef, newFile);
  
      uploadTask.task.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log(error);
        },
        (snapshot) => {
          getDownloadURL(uploadTask.task.snapshot.ref).then((downloadURL) => {
            console.log('newFile available at', downloadURL);
            
            let date = new Date();

            addDoc(filesRef, {
              name: newFile.name,
              size: newFile.size,
              type: newFile.type,
              uploadedAt: serverTimestamp(),
              uploadDate: {
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
              },
              room: roomCode,
              url: downloadURL
            });
          });
        }
      );
      
    }
  };

  const handleFileSelect = (files) => {
    if (files) {
      console.log('fileSelected' + files.name);
      setNewFiles(files);
    }
  }

  useEffect(() => {
    if (newFiles) {
      handleFileUpload(newFiles);
    }
  }, [newFiles]);

  useEffect(()=>{
    const queryFiles = query(filesRef, where('room', '==', roomCode), orderBy("uploadedAt", "desc"));
    const unsubscribe = onSnapshot(queryFiles, (snapshot)=>{
        let files = [];
        snapshot.forEach((doc) =>{
            files.push({...doc.data(), id: doc.id})
        })
        setFiles(files)
        console.log(files.length);
    })
    // I don't know what's happening in this block
    return ()=> unsubscribe();
  }, [])

  return (
    <div className='absolute w-full file-list flex flex-col justify-between h-full'>
      <div className="file-items max-h-[calc(100%-9rem)] overflow-y-scroll pr-[2px]">
        { files.length < 1 ? (<div className='absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] text-slate-500'>No Files in Room</div>) : 
          (files.map((file, index) => <FileItem key={index} name={file.name} size={file.size} url={file.url} />))}
        {/* {
          files.map((file, index) => <FileItem key={index} name={file.name} size={file.size} url={file.url} />)
        } */}
      </div>
      <FileSelector onFileSelect={handleFileSelect} />
    </div>
  )
}

export default FileList