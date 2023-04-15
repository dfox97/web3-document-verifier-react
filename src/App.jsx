import React, { useState } from 'react';
import './App.css';
import EthLogin from './components/EthLogin/EthLogin';
import VerifyDocument from './components/VerifyDocument/VerifyDocument';
import ContractForm from './components/ContractForm/ContractForm';
import { abiKey } from './api/contract/abi';

const CONTRACT_ADDRESS = "0x53564069dedc47009b701099eb838381a77abf87";


function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [contract, setContract] = useState(null);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts.length > 0) {
          const selectedAccount = accounts[0];
          console.log(selectedAccount);
          setUserAddress(selectedAccount);
          window.localStorage.setItem('userAddress', selectedAccount);
          // Initialize the contract
        const web3 = window.ethereum;
        const contract = new web3.Contract(abiKey, CONTRACT_ADDRESS);
        setContract(contract);

        } else {
          throw new Error('No account selected!');
        }
      } catch (error) {
        console.error('The error', error);
      }
    } else {
      alert('No ETH browser extension detected.');
    }
  };

  const handleLogout = () => {
    setUserAddress(null);
    window.localStorage.removeItem('userAddress');
  };

  const handleDocumentSubmit = async (fileName, fileHash, fileURL) => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
    
      // Submit the document to the smart contract
      await contract.methods.add(fileName, fileHash, fileURL).send({
        from: account,
        gas: 3000000,
      });
    
      // Display success message
      alert('Document submitted successfully!');
    } catch (error) {
      console.error('Error submitting document', error);
      alert('Error submitting document');
    }
  }

  return (
    <div className="App">
      <EthLogin
        onLogin={handleLogin}
        onLogout={handleLogout}
        userAddress={userAddress}
      />
      {userAddress ? (
        <div>
          <ContractForm onDocumentSubmit={handleDocumentSubmit} />
          <VerifyDocument contract={contract}/>
        </div>
      ) : (
        <p className='metaMask-Login'>Please login with MetaMask to access the app.</p>
      )}
    </div>
  );
}
export default App;
