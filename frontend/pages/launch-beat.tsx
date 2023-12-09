import LaunchType from "@/components/LaunchType";
import Loader from "@/components/Loader";
import NavbarBar from "@/components/NavBar";
import UploadBeat from "@/components/UploadBeat";
import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { useState } from "react";

export default function Sell() {

  const launchTypes = ["Mint", "Raffles", "Auctions"]
  const [selected, setSelected] = useState<any>()
  const [step, setStep] = useState<number>(4)

  return (
    <div className="bg-black">
      <NavbarBar />
      <div className="grid place-items-center gap-4 mt-10">
        <div className="w-1/2 grid gap-10">
          <div>
            <div className="text-2xl">
              STEP 1 :
            </div>
            <div className="text-xl text-white">
              Upload your beat/music as wav file
            </div>
            <UploadBeat setStep={setStep} />
          </div>
          <Divider orientation="horizontal" className="bg-white text-white my-4"/>
          <div className={step < 2 ? "opacity-40 blur-sm" : "blur-0 opacity-100"}>
            <div className="text-2xl">
              STEP 2 :
            </div>
            <div className="text-xl text-white">
              Wait while we check for plagiarism, Extreme similarities will be reported. Read our terms and conditions.
            </div>
            {step === 2 && <Loader setStep={setStep} step={step} />}
          </div>
          <Divider orientation="horizontal" className="bg-white text-white my-4"/>
          <div className={step < 3 ? "opacity-40 blur-sm" : "blur-0 opacity-100"}>
            <p className='text-success'>You are good to go!</p>
            <div className="text-2xl">
              STEP 3 :
            </div>
            <div className="text-xl text-white">
              Select how to launch your music
            </div>
            <LaunchType />
          </div>
        </div>
      </div>

    </div>
  )
}
