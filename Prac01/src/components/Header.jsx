import {ethers} from "ethers"
import {useState} from "react"

function Header() {
    const [signer, setSigner] = useState();

    const LoginMetamask = async () => {
        try{
            if(!window.ethereum) return;

            var meta = window.ethereum;
            if(window.ethereum.providerMap) {
                for (let [key, value] of window.ethereum.providerMap.entries()) {
                    if (key === "MetaMask") {
                        meta = value;
                        break;
                    }
                }
            }

            const provider = new ethers.BrowserProvider(meta);
            const signer = await provider.getSigner();
            setSigner(signer);
        } catch (error) {
            console.log(error);
        }
    }

    const LogoutMetamask = async () => {
        setSigner();
    }

    return (
        <header className="bg-green-100 flex justify-between items-center p-8 h-20">
            <div className="text-2xl font-semibold">👼 Angel + 🐷 Pig = ❓ </div>
            <div>
                {
                signer 
                ? <div>
                    {signer.address.substring(0, 7)}...{signer.address.substring(signer.address.length-5, signer.address.length)}
                    <button className="bg-yellow-100 border-2 border-yellow-500 px-3 py-2 font-semibold rounded-full hover:bg-yellow-300" onClick={LogoutMetamask}>
                        Logout
                    </button>
                </div>
                : <button className="bg-yellow-100 border-2 border-yellow-500 px-5 py-2 font-semibold rounded-full hover:bg-yellow-300" onClick={LoginMetamask}>
                    🦊 메다마스크로 로그인
                </button>
                }
            </div>
        </header>
    )
  }
  
  export default Header;