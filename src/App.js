import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import { GearFill  } from 'react-bootstrap-icons';

import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';
import ConfigModal from './components/ConfigModal';

function App() {
  const[provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  const [slippageAmount, setSlippageAmount] = useState(2)
  const [deadlineMinutes, setDeadlineMinutes] = useState(10)
  const [showModal, setShowModal] = useState(undefined)

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
    <div className="appNav">
        <div className="my-2 buttonContainer buttonContainerTop">
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Vote"} />
          <PageButton name={"Charts"} />
        </div>

        <div className="rightNav">
          <div className="connectButtonContainer">
            <ConnectButton
              provider={provider}
              isConnected={isConnected}
              signerAddress={signerAddress}
              getSigner={getSigner}
            />
          </div>
          <div className="my-2 buttonContainer">
            <PageButton name={"..."} isBold={true} />
          </div>
        </div>
      </div>

        <div className='appBody'>
          <div className="swapContainer">
            <div className='swapHeader'>
              <span className='swapText'>Swap</span>
              <span className='gearContainer' onClick={() => setShowModal(true)}>
                <GearFill/>
              </span>
              {showModal && (
                <ConfigModal
                  onClose={() => setShowModal(false)}
                  setDeadLineMinutes ={setDeadlineMinutes}
                  deadlineMinutes = {deadlineMinutes}
                  setSlippageAmount={setSlippageAmount}
                  slippageAmount = {slippageAmount}/>
              )}
            </div>
            <div className='swapBody'>

            </div>
          </div>
        </div>

      </div>
  );
}

export default App;

