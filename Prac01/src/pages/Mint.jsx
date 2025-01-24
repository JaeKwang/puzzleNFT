import { useOutletContext } from "react-router-dom";
import { ethers } from "ethers";

function MintPage() {
  const {signer, contract} = useOutletContext();

  const mint = async () => {
    try{
      if(!signer || !contract) return;
      const res = await contract.mintNFT(7, 100);
      console.log(res);
  
    } catch (e) {
      console.log(e);
    }
  }
  
  return <div className="bg-red-100 min-h-screen">
    <button className={`${signer ? "btn-style " : "btn-disable"}`} disabled={!signer} onClick={mint}>Mint</button>
  </div>
}

export default MintPage;