
import React, { useState } from 'react';
import './VerifyDocument.css';

const VerifyDocument = ({contract}) => {
  const [index, setIndex] = useState('');
  const [hashToVerify, setHashToVerify] = useState('');
  const [fileData, setFileData] = useState(null);

  const handleIndexChange = (e) => {
    setIndex(e.target.value);
  };

  const handleHashChange = (e) => {
    setHashToVerify(e.target.value);
  };

  const handleVerifyDocument = async (e) => {
    e.preventDefault();

    try {
      const data = await contract.methods.getFile(index).call();
      console.log(data);

      if (data[1] === hashToVerify) {
        setFileData(data);
        alert('Document verified successfully!');
      } else {
        alert('Document verification failed!');
      }
    } catch (error) {
      console.error('Error verifying document', error);
      alert('Error verifying document');
    }
  };

  return (
    <div className="verifyDocument">
      <h2>Verify Document</h2>
      <form onSubmit={handleVerifyDocument}>
        <label>
          Document Index:
          <input type="text" value={index} onChange={handleIndexChange} />
        </label>
        <label>
          Document Hash:
          <input type="text" value={hashToVerify} onChange={handleHashChange} />
        </label>
        <button type="submit">Verify</button>
      </form>
      {fileData && (
        <div>
          <p>File Name: {fileData[0]}</p>
          <p>File Hash: {fileData[1]}</p>
          <p>File URL: {fileData[2]}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyDocument;
