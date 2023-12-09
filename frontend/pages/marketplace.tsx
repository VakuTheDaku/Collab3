import NavbarItem from "@/components/NavBar";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function marketplace() {
    return (
        <div className="bg-black">
            <NavbarItem />
            <div className="grid place-items-center">
                <div className="flex gap-4">
                    <Button variant="bordered" color="warning">
                        <Link href="launch-beat">
                            Launch Your Beats as Partial NFTs
                        </Link>
                    </Button>
                </div>
                <div className="text-4xl">
                    Sell your beats as fractional NFTs.
                    You are the owner of your assets.
                </div>
            </div>
        </div>
    )
}
