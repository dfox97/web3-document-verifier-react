import React, { useState } from 'react';

const DocumentData = ({ contract, userAddress }) => {
  const [documents, setDocuments] = useState([]);
  const [isView, setIsView] = useState(false);

  const fetchDocuments = async () => {
    let fetchedDocuments = [];

    const length = await contract.methods
      .getLength()
      .call({ from: userAddress });

    for (let i = 0; i < length; i++) {
      const result = await contract.methods
        .getFile(i)
        .call({ from: userAddress });
      fetchedDocuments.push({
        id: i,
        fileName: result[0],
        hash: result[1],
        URL: result[2],
      });
    }

    setDocuments(fetchedDocuments);
  };

  const handleViewDataClick = async () => {
    if (!isView) {
      await fetchDocuments();
    }
    setIsView(!isView);
  };

  return (
    <div className="document-data-container">
      <div className="view-data-button-container">
        <button onClick={handleViewDataClick}>
          {isView ? 'Hide data' : 'View data'}
        </button>
      </div>
      {isView &&
        documents.map((document, index) => (
          <div key={index} className="document-data">
            <h3>Document ID: {document.id}</h3>
            <p>File Name: {document.fileName}</p>
            <p>Hash: {document.hash}</p>
            <p>URL: <a href={document.URL} target="_blank" rel="noopener noreferrer">{document.URL}</a></p>
          </div>
        ))}
    </div>
  );
};

export default DocumentData;
