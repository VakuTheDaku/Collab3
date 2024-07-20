import AudioProcessor from "@/components/AudioProcessor";
import AudioMixer from "@/components/MixAudio";
import NavbarBar from "@/components/NavBar";
import MintButton from "@/components/mintButton";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="bg-black">
      <NavbarBar />
      <div className="grid place-items-center mt-10">
      <div className=" grid grid-cols-2 gap-5">
        <div className="grid cols-span-1">
          <Image
            width={300}
            alt="NextUI hero Image"
            src="/guitar.jpeg"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="row-span-1">
          <Image
            width={300}
            alt="NextUI hero Image"
            src="/trumpet.jpeg"
          />
          </div>
          <div className="row-span-1 ">
          <Image
            width={300}
            alt="NextUI hero Image"
            src="/logo.jpeg"
          />
          </div>
        </div>
        </div>
      </div>
      {/* <MintButton uri="https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dh7rndaveypslck1fd0dfjqvk1el2b1p01y27939d4ellmbosab" />
      <AudioProcessor /> */}
    </div>
  )
}
