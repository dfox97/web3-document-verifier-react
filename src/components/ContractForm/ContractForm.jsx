import React, { useState } from 'react';
import './ContractForm.css';

const ContractForm = ({ onDocumentSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [fileHash, setFileHash] = useState('');
  const [fileURL, setFileURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName || !fileHash || !fileURL) {
      alert('Please fill in all fields.');
      return;
    }
    onDocumentSubmit({ fileName, fileHash, fileURL });
  };

  return (
    <div className="contractForm">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileName">File Name</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fileHash">File Hash</label>
          <input
            type="text"
            id="fileHash"
            value={fileHash}
            onChange={(e) => setFileHash(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fileURL">File URL</label>
          <input
            type="text"
            id="fileURL"
            value={fileURL}
            onChange={(e) => setFileURL(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContractForm;
