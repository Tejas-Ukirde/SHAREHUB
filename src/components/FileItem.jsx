import React from 'react'

const FileItem = ({index, name, size, url}) => {

  const handleDownload = ()=>{
    if(url){
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = name;
      downloadLink.target = '_blank'
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div key={index} onClick={handleDownload}
      className='mb-2 flex justify-between items-center rounded bg-slate-100 hover:bg-slate-200 cursor-pointer'>

      <i class="fa-solid fa-arrow-down h-full px-4 rounded-sm text-slate-600"></i>
      <p className="file-name w-full py-3 max-sm:py-4  font-semibold text-slate-800">{name}</p>
      <p className="file-size w-20 text-xs text-slate-500">{Math.round((size/1048576) * 100) / 100} MB</p>
    </div>
  )
}

export default FileItem