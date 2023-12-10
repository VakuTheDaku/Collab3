// pages/profile.tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import AudioCardProfile from '@/components/AudioCardProfile';

export default function Profile() {
  const userName = 'Your Name'; // Replace with the user's name
  const audioData = [
    {
      title: 'Audio 1',
      description: 'Description for Audio 1',
      audioUrl: 'https://example.com/audio1.mp3', // Replace with actual audio URL
      isListed: true,
    },
    {
      title: 'Audio 2',
      description: 'Description for Audio 2',
      audioUrl: 'https://example.com/audio2.mp3', // Replace with actual audio URL
      isListed: false,
    },
    // Add more audio data as needed
  ];

  const handleToggleList = (index: number) => {
    // Implement logic to toggle the listed status of the audio at the given index
    console.log(`Toggle list status for audio at index ${index}`);
  };

  return (
    <div className="bg-black">
      <NavBar />
      <div className="text-white text-center p-6">
        <p className="text-lg font-bold">Hey, {userName}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {audioData.map((audio, index) => (
          <AudioCardProfile
            key={index}
            title={audio.title}
            description={audio.description}
            audioUrl={audio.audioUrl}
            isListed={audio.isListed}
            onToggleList={() => handleToggleList(index)}
          />
        ))}
      </div>
    </div>
  );
}
