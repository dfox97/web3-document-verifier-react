
import React, { useState } from 'react';
import './VerifyDocument.css';

const VerifyDocument = ({contract, userAddress}) => {
  const [index, setIndex] = useState('');
  const [hashToVerify, setHashToVerify] = useState('');
  const [fileData, setFileData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);


  const handleIndexChange = (e) => {
    setIndex(e.target.value);
  };

  const handleHashChange = (e) => {
    setHashToVerify(e.target.value);
  };

  const handleVerifyDocument = async (e) => {
    e.preventDefault();

    try {
      const data = await contract.methods.getFile(index).call({from: userAddress});
      if (data[1] === hashToVerify) {
        setFileData(data);
        console.log(data);
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failed');
        setFileData(null);
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
      {verificationStatus === 'success' && fileData && (
        <div>
          <p className="verification-success">Document verification success!</p>

          <p>File URL: <a href={fileData[2]} target="_blank" rel="noopener noreferrer">{fileData[2]}</a></p>
        </div>
      )}
      {verificationStatus === 'failed' && (
        <p className="verification-failed">Document verification failed!</p>
      )}
    </div>
  );
};

export default VerifyDocument;
