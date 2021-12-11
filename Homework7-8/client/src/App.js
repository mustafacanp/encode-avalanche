import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import nftAbi from "./contracts/VolcanoToken.json"; // Copied ABI from Homework6

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [transferTokenId, setTransferTokenId] = useState("");
  const [ownerOfTokenId, setOwnerOfTokenId] = useState("");
  const [ownerMessage, setOwnerMessage] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [certificate, setCertificate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transferMessage, setTransferMessage] = useState("");

  useEffect(() => {
    loadWeb3Accounts();
  }, []);

  useEffect(() => {
    if (account) {
      getContractNameAndBalance();
    }
  }, [account]);

  if (!window.web3) {
    return alert("Please install MetaMask to use this dApp!");
  }

  // Initialise web3 library
  const web3 = new Web3(window.web3.currentProvider);
  window.ethereum.request({ method: "eth_requestAccounts" });

  // Initialise contract
  const contract = new web3.eth.Contract(
    nftAbi.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  // Load accounts from MetaMask
  const loadWeb3Accounts = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const getContractNameAndBalance = async () => {
    const name = await contract.methods.name().call();
    const balance = await contract.methods.balanceOf(account).call();
    console.log("Contract name:", name);
    console.log(`Balance of ${account}:`, balance);
  };

  const mintNFT = async () => {
    if (!name) alert("Please type your name to get your certificate.");
    // Generate certificate and send to IPFS
    const res = await axios.post("http://localhost:3001/ipfs-upload", { name });
    const mintRes = await contract.methods
      .mint(res.data)
      .send({ from: account });
    if (mintRes.status) {
      const tokenID = await contract.methods.tokenID().call();
      setSuccessMessage(`NFT Minted! Token ID: ${tokenID}`);
      setName("");
    } else {
      setSuccessMessage("ERROR!", JSON.stringify(mintRes));
    }
  };

  const getTokenURI = async () => {
    const tokenURI = await contract.methods.tokenURI(tokenId).call();
    setCertificate(tokenURI);
  };

  const getOwnerOf = async () => {
    const ownerAddress = await contract.methods.ownerOf(ownerOfTokenId).call();
    setOwnerMessage(ownerAddress);
  };

  const transferNFT = async () => {
    const transferRes = await contract.methods
      .safeTransferFrom(account, transferTo, transferTokenId)
      .send({ from: account });
    if (transferRes.status) {
      setTransferMessage("NFT Transferred!");
      setTransferTo("");
      setTransferTokenId("");
    } else {
      setTransferMessage("ERROR!", JSON.stringify(transferRes));
    }
  };

  return (
    account && (
      <div className="app">
        <div className="container">
          <div className="box">
            <label>Type your name to get your certificate</label>
            <br />
            <input
              value={name}
              placeholder="Name Surname"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <button onClick={mintNFT}>MINT</button>
            <br />
            {successMessage}
          </div>

          <div className="box">
            <label>Get NFT by token ID</label>
            <br />
            <input
              value={tokenId}
              placeholder="Token ID"
              onChange={(e) => setTokenId(e.target.value)}
            />
            <br />
            <button onClick={getTokenURI}>GET</button>
            <br />
            {certificate ? (
              <a href={certificate} target="_blank" rel="noreferrer">
                {certificate}
              </a>
            ) : (
              "Cretificate not found!"
            )}
          </div>

          <div className="box">
            <label>Transfer Your NFT</label>
            <br />
            <input
              value={transferTo}
              placeholder="To"
              onChange={(e) => setTransferTo(e.target.value)}
            />
            <br />
            <input
              value={transferTokenId}
              placeholder="Token ID"
              onChange={(e) => setTransferTokenId(e.target.value)}
            />
            <br />
            <button onClick={transferNFT}>TRANSFER</button>
            <br />
            {transferMessage}
          </div>

          <div className="box">
            <label>Get Owner Of an NFT</label>
            <br />
            <input
              value={ownerOfTokenId}
              placeholder="Token ID"
              onChange={(e) => setOwnerOfTokenId(e.target.value)}
            />
            <br />
            <button onClick={getOwnerOf}>GET OWNER</button>
            <br />
            {ownerMessage || "Owner not found!"}
          </div>
        </div>
      </div>
    )
  );
}

export default App;
