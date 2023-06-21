import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";


function App() {
  const[provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  useEffect(() =>{
    const onLoad = async () =>{
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    }
    onLoad()
  },[])

  const getSigner = async provider =>{
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  }

  const isConnected = () => signer !== undefined
  const getWalletAddress = () =>{
    signer.getAddress()
    .then(address => {
      setSignerAddress(address)

    })
  }

  if (signer !== undefined) {
    getWalletAddress()
  }

  return (
    <div className="App">
      <h1>Uniswap Clone</h1>
    </div>
  );
}

export default App;
