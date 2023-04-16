import React, { useState } from 'react';
import './App.css';
import EthLogin from './components/EthLogin/EthLogin';
import VerifyDocument from './components/VerifyDocument/VerifyDocument';
import ContractForm from './components/ContractForm/ContractForm';
import abiKey from './api/contract/abi';
import Web3 from 'web3';
import DocumentData from './components/DocumentData/DocumentData';
import './components/DocumentData/DocumentData.css';


// https://sepolia.etherscan.io/tx/0x9cfaf63edcf9beffff802243d2841b1bb13fa12c6fee161a160debbb1150ee9e
const CONTRACT_ADDRESS = "0xc447Da346b84b6973799CF08Fb1fb6F71f5b184B";


function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [contract, setContract] = useState(null);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = window.ethereum
        if (accounts.length > 0) {
          const selectedAccount = accounts[0];
          setUserAddress(selectedAccount);
          window.localStorage.setItem('userAddress', selectedAccount); 
          // Initialize the contract
          const web3 = new Web3(provider);
          const contract = new web3.eth.Contract(abiKey, CONTRACT_ADDRESS);

          setContract(contract, selectedAccount);
          // fetchDocuments(contract, selectedAccount);
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


  return (
    <div className="App">
      <EthLogin
        onLogin={handleLogin}
        onLogout={handleLogout}
        userAddress={userAddress}
      />
      {userAddress ? (
        <div>
        <div className="form-container">
         
          <ContractForm contract={contract} userAddress={userAddress} />
   
          <VerifyDocument contract={contract} userAddress={userAddress} />
        </div>
        <div className="view-data-button-container">
          <DocumentData contract={contract} userAddress={userAddress} />
        </div>
      </div>
      ) : (
        <p className='metaMask-Login'>Please login with MetaMask to access the app.</p>
      )}
    </div>
  );
}
export default App;
