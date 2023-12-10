import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Dropdown, DropdownTrigger, Button, Input } from "@nextui-org/react";
import ContractInteraction from "./contractInteraction";

export default function LaunchType() {

    const [mintOptions, setMintOptions] = useState<any>({
        price: 0
    });

    const [raffleOptions, setRaffleOptions] = useState<any>({
        price: 0
    });

    const handleMintInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMintOptions((prevOptions: any) => ({
            ...prevOptions,
            [name]: value,
        }));
    };

    const handleRaffleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRaffleOptions((prevOptions: any) => ({
            ...prevOptions,
            [name]: value,
        }));
    };

    const handleMintSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // You can add your minting logic or API call here
        console.log('Mint options:', mintOptions);
    };

    const handleRaffleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // You can add your minting logic or API call here
        console.log('Mint options:', raffleOptions);
    };

    const handleAuctionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // You can add your minting logic or API call here
        console.log('Auction');
    };

    return (
        <div className="flex w-full flex-col mt-2">
            <Tabs aria-label="Options" variant="bordered" color="secondary"
                classNames={{
                    tabList: "bg-black bg-opacity-80 text-white w-full shadow-md"
                }}
                className="w-full">
                <Tab key="mint" title="Mint">
                    <Card className="bg-black text-white">
                        <CardBody>
                            Live minting your NFTs
                            <div className="mt-2">
                                <form onSubmit={handleMintSubmit} className="bg-black">
                                    <Input onChange={handleMintInputChange} name="price" type="number" label="Price" className="w-1/2 bg-opacity-10 bg-slate-200" />
                                </form>
                            </div>
                        </CardBody>
                        <ContractInteraction />
                    </Card>
                </Tab>
                <Tab key="raffles" title="Raffles">
                    <Card className="bg-black text-white">
                        <CardBody>
                            Raffle your beat
                            <div>
                                <form onSubmit={handleRaffleSubmit} className="bg-black">
                                    <Input onChange={handleRaffleInputChange} name="price" type="number" label="price" placeholder="Enter your price or keep empty/0 for infinite mints" className="w-1/2 bg-opacity-10 bg-white" />
                                    <Button className="mt-2" variant="flat" color="secondary" type="submit">Launch raffle</Button>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="auctions" title="Auctions">
                    <Card className="bg-black text-white">
                    <CardBody>
                            Auction your beat
                            <div>
                                <form onSubmit={handleAuctionSubmit} className="bg-black">
                                    <Button className="mt-2" variant="flat" color="secondary" type="submit">Launch auction</Button>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
