// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNFT is ERC1155 {
    string name;
    string symbol;
    string metadataURI;

    // Pig Puzzle, PIG, https://violet-eligible-junglefowl-936.mypinata.cloud/ipfs/bafybeigao7ok4e4bngde6a3zybm6u2rikgvkbjieu2vici5scdynlkmvlm/
    constructor(string memory _name, string memory _symbol, string memory _URI) ERC1155(''){
        name = _name;
        symbol = _symbol;
        metadataURI = _URI;
    }

    function mintNFT(uint _tokenID, uint _amount) public {
        _mint(msg.sender, _tokenID, _amount, "");
    }

    function uri(uint _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(metadataURI, Strings.toString(_tokenId), ".json"));
    }
}
