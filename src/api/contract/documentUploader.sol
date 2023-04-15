// SPDX-License-Identifier: TEST-DANNY
pragma solidity ^0.8.0;
contract TestIpfsDocument {


    struct File {
        string fileName;
        string hash;
        string URL; 

    }
    mapping(address => File[]) files;


    function add(string memory _fileName, string memory _hash, string memory _url) public {
        files[msg.sender].push(File({fileName: _fileName, hash: _hash, URL: _url}));

    }

    function getFile(uint _index) public view returns(string memory, string memory, string memory) {
        File memory file = files[msg.sender][_index];
        return(file.fileName, file.hash, file.URL);
        
    }

    function getLength() public view returns(uint) {
        return files[msg.sender].length;
    }
    
    function getHash() public view returns(string memory){
        File memory file = files[msg.sender][0];
        return file.hash;
    }

    function verifyDocument(uint id, string memory hashToVerify) public view returns (bool){
       File memory file = files[msg.sender][id];
       return (keccak256(abi.encodePacked((hashToVerify))) == keccak256(abi.encodePacked((file.hash))));
     }
}