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
            const signer = await provider.getSigner();
            return { signer, provider };
        } else {
            throw new Error('MetaMask is not installed or not enabled.');
        }
    };

    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "burnCollectible",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "tokenUri",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fingerprint",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "spectrogram",
                    "type": "string"
                }
            ],
            "name": "createCollectible",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "tokenUri",
                    "type": "string"
                }
            ],
            "name": "forkCollectible",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getByTokenId",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "tokenUri",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "parentTokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isForkable",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "forkPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "fingerprint",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "spectrogram",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct MusicNFT.TokenData",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getForkable",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "tokenUri",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "parentTokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isForkable",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "forkPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "fingerprint",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "spectrogram",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct MusicNFT.TokenData[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "getOwnedTokens",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "tokenUri",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "parentTokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isForkable",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "forkPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "fingerprint",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "spectrogram",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct MusicNFT.TokenData[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isForkable",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "forkPrice",
                    "type": "uint256"
                }
            ],
            "name": "setForkable",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenCounter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "unsetForkable",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const contractAddress = '0x244AB0A21e9c6efCF237395228cC855118a5506c'; // Replace with your contract address


    const mintNFT = async () => {
        try {

            if (typeof window.ethereum !== 'undefined') {

                //@ts-ignore
                const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)
                //@ts-ignore
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Get the signer from the provider
                const signer = provider.getSigner();
                console.log("called me")
                const gasLimit = 30000
                const contract: any = new ethers.Contract(contractAddress,contractABI, provider);
                console.log("signer", await signer.getAddress(), "contract", contract)
                // await signer.signMessage("yoo")
                const connectedContract = await contract.connect(signer)
                const result = await contract.connect(signer).createCollectible("https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab", "dkhfk", "dskjf", { gasLimit })
                const txn = await result.wait()
                console.log(">>>> nft minted!", result)
            }
        } catch (error) {
            console.error('Error calling contract function:', error);
        }
    };

    // const subscribeChannel = async () => {
    //     //@ts-ignore
    //     const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

    //     const contract = new ethers.Contract(contractAddress, ABI, provider)
    //     console.log({ contract })

    //     //@ts-ignore
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });

    //     // Get the signer from the provider
    //     const signer = provider.getSigner();
    //     // Create a transaction object for the mint function
    //     await contract.connect(signer).subscribeChannel().then(async (res: any) => {
    //         console.log("Working")
    //         await res.wait();

    //     });
    // }

    return (
        <div>
            <button onClick={mintNFT}>
                mint
            </button>
        </div>
    );
};

export default ContractInteraction;
