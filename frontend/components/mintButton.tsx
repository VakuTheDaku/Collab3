import mintNFT from "@/utils/mint";
import { useState } from "react";

const MintButton: React.FC<{ uri: string }> = ({ uri }) => {
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    setMinting(true);
    try {
      await mintNFT(uri);
      console.log('NFT minted successfully!');
    } catch (error: any) {
      console.error('Error minting NFT:', error.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <button onClick={handleMint} disabled={minting}>
      {minting ? 'Minting...' : 'Mint NFT'}
    </button>
  );
};

export default MintButton;