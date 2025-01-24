import {ethers} from "ethers"
import { Link } from "react-router-dom";

function Header({signer, setSigner}) {

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
                <Link className="link-style" to="/">Home</Link>
                <Link className="link-style" to="/mint">Mint</Link>
            </div>
      
            <div>
                {
                signer 
                ? <div className="flex items-center">
                    <div className="text-gray-600 px-5 font-semibold italic">
                        {signer.address.substring(0, 7)}...{signer.address.substring(signer.address.length-5, signer.address.length)}
                    </div>
                    <button className="btn-style" onClick={LogoutMetamask}>
                        Logout
                    </button>
                </div>
                : <button className="btn-style" onClick={LoginMetamask}>
                    🦊 메다마스크로 로그인
                </button>
                }
            </div>
        </header>
    )
  }
  
  export default Header;