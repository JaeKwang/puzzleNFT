import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  const {signer, contract} = useOutletContext();
  const [balance, setBalance] = useState(Array(16).fill(0))
  const [ownedCount, setOwnedCount] = useState(0);

  useEffect(() => {
    const getNFTs = async () => {
      try{
        if(!signer || !contract){
          setBalance(Array(16).fill(0));
        } else {
          // 반복문
          if(0) {
            const ids = Array.from({ length: 16 }, (_, i) => i + 1);
            const res = await Promise.all(ids.map(async (id) => {
              const balance = await contract.balanceOf(signer.address, id);
              return balance;
            }))
          }

          // 한번에 긁어오기
          if(1) {
          const addr = Array(16).fill(signer.address);
          const ids = Array.from({ length: 16 }, (_, i) => i + 1);
          const res = await contract.balanceOfBatch(addr, ids);
          setBalance(res);
          }
        }
      } catch(e) {
        console.log(e);
      }
    }
    
    getNFTs();
  }, [signer, contract])

  useEffect(() => {
    setOwnedCount(balance.filter(v => v != 0).length);
  }, [balance])

  const images = Array.from({ length:16 }, (_, i) => {
    const num = String(i+1).padStart(2, '0');
    return `https://violet-eligible-junglefowl-936.mypinata.cloud/ipfs/bafybeifjt7knciicbb35gyasj47s3yj4zl27kstiapkokm3veqfp5ff22i/${num}.png`
  })
  
  return <div className="flex flex-col items-center">
    <p className="text-5xl font-bold py-8">Your Puzzle</p>
    <div className="flex item">
      <div className="w-96 h-6 bg-gray-500 rounded-lg mb-4 relative overflow-hidden">
        <div 
          className="bg-green-400 rounded-lg h-6"
          style={{ width: `${ownedCount/balance.length * 100}%`}}
        />
        <p className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {Math.floor((ownedCount / balance.length) * 100)}%
        </p>
      </div>
      <p className="ml-8">보유한 NFT ({ownedCount}/{balance.length})</p>
    </div>
    <div className="grid grid-cols-4 w-150">
      {images.map((v, i)=> (
        <img
          key={v}
          className= {`p-0.5 ${balance[i] == 0 && "brightness-20"}`}
          src={v}
        />
      ))}
    </div>
  </div>
}

export default HomePage;