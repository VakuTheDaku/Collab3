import AudioMixer from "@/components/MixAudio";
import NavbarItem from "@/components/NavBar";

export default function Mixer(){
    return(
        <div className="bg-black">
             <NavbarItem />
            <AudioMixer />
        </div>
    )
}