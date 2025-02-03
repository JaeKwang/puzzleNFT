import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
import MintNFT from "../lib/MintNFT.json";

function Layout () {
    const [signer, setSigner] = useState();
    const [contract, setContract] = useState();

    useEffect(() => {
        if(!signer) return;
        
        setContract(new Contract(
            '0x52cA02aB36d01B516975616DD547b500935d5FF3',
            MintNFT,
            signer
        ))
    }, [signer]);

    useEffect(() => {
        if(!contract) return;
    }, [contract]);

    return <div className="bg-gray-100 min-h-screen">
        <Header signer={signer} setSigner={setSigner}/>
        <Outlet context={{signer, contract}} />
    </div>
}

export default Layout;