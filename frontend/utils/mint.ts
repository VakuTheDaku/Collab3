const CONTRACT_ADDRESS = "0xbe67990ea7A49B36F2072D5327970C621f90CD99"
const META_DATA_URL = "https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab"
import { ethers } from "ethers"
import {SECRET_KEY} from './config'
export default async function mintNFT( uri : string) {
  const contractAddress = CONTRACT_ADDRESS; // Replace with the actual contract address
  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/c7e699cb03ba449c9bc140dc464cdace"); // Replace with your Infura API key
  const signer = new ethers.Wallet(SECRET_KEY, provider); // Replace with the private key of the account that deployed the contract
  const contract = new ethers.Contract(contractAddress, ["function createCollectible(string tokenUri)", "function viewCollectible(uint256 tokenId) public view returns(string memory)"], signer);
  const gasLimit = 300000;
  const tokenURI = META_DATA_URL; // Replace with the actual metadata URI
  console.log("contract", contract)
  try {
    // const tx = await contract.createCollectible("https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab", {gasLimit});
    // const mess = await tx.wait();
    // console.log(mess)
    // console.log("NFT Minted Successfully!");
    const view = await contract.viewCollectible(0)
    // const letmess = await view.wait();
    console.log(view)
    console.log("NFT Minted Successfully!");
  } catch (error: any) {
    console.error("Error minting NFT:", error.message);
  }
}
