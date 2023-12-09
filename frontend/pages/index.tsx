import AudioProcessor from "@/components/AudioProcessor";
import AudioMixer from "@/components/MixAudio";
import NavbarBar from "@/components/NavBar";
import MintButton from "@/components/mintButton";

export default function Home() {
  return (
    <div className="bg-black">
      <NavbarBar />
      <MintButton uri="https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab" />
      <AudioProcessor />
    </div>
  )
}
