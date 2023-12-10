// pages/marketplace.tsx
import React, { useState, useEffect } from 'react';
import NavbarItem from '@/components/NavBar';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import AudioCard from '@/components/AudioCard';

interface AudioData {
  title: string;
  description: string;
  audioUrl: string;
  price: number;
}

const Marketplace: React.FC = () => {
  const [audioData, setAudioData] = useState<AudioData[]>([
    {
      title: 'Title 1',
      description: 'Description 1',
      audioUrl: 'https://example.com/audio1.mp3',
      price: 50,
    },
    {
      title: 'Title 2',
      description: 'Description 2',
      audioUrl: 'https://example.com/audio2.mp3',
      price: 75,
    },
    // Add more data as needed
  ]);

  useEffect(() => {
    // Fetch data from your API or database and update the audioData state
    // Example using fetch:
    // fetch('your_api_endpoint')
    //   .then(response => response.json())
    //   .then(data => setAudioData(data))
    //   .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bg-black">
      <NavbarItem />
      <div className="grid place-items-center">
        <div className="flex gap-4">
          <Button variant="bordered" color="warning">
            <Link href="launch-beat">Launch Your Beats as Partial NFTs</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {audioData.map((audio, index) => (
          <AudioCard key={index} data={audio} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;

