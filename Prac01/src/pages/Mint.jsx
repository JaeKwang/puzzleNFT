import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function MintPage() {
  const [tokenId, setTokenId] = useState(1);
  const [amount, setAmount] = useState(1);
  const {signer, contract} = useOutletContext();

  const [metadata, setMetadata] = useState();
  const [balance, setBalance] = useState(0);
  const [addedAmount, setAddedAmount] = useState(0);

  const mint = async () => {
    try{
      if(!signer || !contract) return;
      await contract.mintNFT(tokenId, amount);
      
      const uri = await contract.uri(tokenId);
      const res = await axios.get(uri);
      setMetadata(res.data);

      const balance = await contract.balanceOf(signer.address, tokenId);
      setBalance(Number(balance));
      setAddedAmount(amount);

    } catch (e) {
      console.log(e);
    }
  }
  
  return <div className="py-8 flex-col flex items-center">
    <p className="text-3xl font-bold pb-8">Mint Your Puzzle NFT!</p>
    <div className="flex-row flex items-center">
      <p className="text-xl pr-2">ID</p>
      <input
        className="input-style"
        type="number"
        min={1}
        max={16}
        value={tokenId}
        onChange={(e)=>setTokenId(e.target.value)}
      />
      <p className="text-xl pl-4 pr-2">Amount</p>
      <input
      className="input-style mx-2"
        type="number"
        min={0}
        max={10}
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />
      <button className={`${signer ? "btn-style " : "btn-disable"}`} disabled={!signer} onClick={mint}>Mint</button>
    </div>
    {metadata
    ? <div className="flex-col flex items-center">
      <p className="text-2xl font-bold pt-16 pb-8">You got a piece of puzzle ({tokenId}/16)</p>
      <img src={metadata.image} alt={metadata.name} />
      <p>you have collected {balance + addedAmount} pieces</p>
      
    </div>
    :<></>}
  </div>
}

export default MintPage;