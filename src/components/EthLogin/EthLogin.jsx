import React from 'react';
import './EthLogin.css';
import MetaMaskLogo from './MetaMask.png';

const EthLogin = ({ onLogin, onLogout, userAddress }) => {
  const truncateAddress = (address) => {
    if (!address) {
      return '';
    }
    return `${address.substr(0, 5)}...${address.substr(
      address.length - 5,
      address.length
    )}`;
  };

  return (
    <div className="container">
      {userAddress ? (
        <div>
          <span className="userAddress" title={userAddress}>ETH Address: {truncateAddress(userAddress)}</span>
          <button className="logoutButton" onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div className="loginWrapper">
          <img className="logo" src={MetaMaskLogo} alt="metamask" />
          <button className="loginButton" onClick={onLogin}>Login with MetaMask</button>
        </div>
      )}
    </div>
  );
};

export default EthLogin;
