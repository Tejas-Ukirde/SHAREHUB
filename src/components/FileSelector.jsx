import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const FileSelector = ({ onFileSelect }) => {

  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const files = e.dataTransfer.files;
    onFileSelect(files);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    onFileSelect(files);
  };

  return (
    <div className='file-selector relative bg-slate-100 h-32 rounded-lg border-dashed border-2 border-slate-400 overflow-hidden'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <label htmlFor="files"
        className='absolute h-full w-full grid place-items-center text-slate-600 text-lg cursor-pointer hover:bg-slate-200'>
          Select or Drag & drop your files here
      </label>
      <input type="file" multiple
        onChange={handleInputChange}
        ref={fileInputRef}
        name="files" id="files" className='hidden'/>
    </div>
  )
}

FileSelector.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};


export default FileSelector