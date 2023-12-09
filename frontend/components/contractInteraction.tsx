// components/ContractInteraction.tsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';


declare global {
    interface Window {
        ethereum: any;
    }
}
const ContractInteraction: React.FC = () => {
    const [contractData, setContractData] = useState<string | null>(null);
    const [newValue, setNewValue] = useState<string>('');
    const [processing, setProcessing] = useState(false);

    const getWallet = async () => {
        // Check if MetaMask is installed and enabled
        if (typeof window.ethereum !== 'undefined') {

            //@ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
            //@ts-ignore
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Get the signer from the provider
            const signer = provider.getSigner();
            return { signer, provider };
        } else {
            throw new Error('MetaMask is not installed or not enabled.');
        }
    };

    const contractABI = ["function createCollectible(string memory tokenUri, string memory fingerprint, string memory spectrogram) public returns(uint256)"];
    const contractAddress = '0xA7009a8Dea1746Edb88E36D48b585D235E34f5C6'; // Replace with your contract address


    const mintNFT = async () => {
        try {

            console.log("called me")
            const { signer, provider } = await getWallet();
            const gasLimit = 30000
            const contract: any = new ethers.Contract(contractAddress, ["function createCollectible(string memory tokenUri, string memory fingerprint, string memory spectrogram) public returns(uint256)"], provider);
            console.log("signer", await signer.getAddress(), "contract", contract)
            // await signer.signMessage("yoo")
            const connectedContract = await contract.connect(signer)
            const result = await connectedContract.createCollectible("https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab", "dkhfk", "dskjf")
            const txn = await result.wait()
            console.log(">>>> nft minted!", result)
        } catch (error) {
            console.error('Error calling contract function:', error);
        }
    };

    const subscribeChannel = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(contractAddress, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        const signer = provider.getSigner();
        // Create a transaction object for the mint function
        await contract.connect(signer).subscribeChannel().then(async (res: any) => {
            console.log("Working")
            await res.wait();
            
        });
    }

    return (
        <div>
            <button onClick={mintNFT}>
                mint
            </button>
        </div>
    );
};

export default ContractInteraction;
