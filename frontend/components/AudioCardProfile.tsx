// components/AudioCard.tsx
import React, { useState } from 'react';

interface AudioCardProps {
  title: string;
  description: string;
  audioUrl: string;
  isListed: boolean;
  onToggleList: () => void;
}

const AudioCardProfile: React.FC<AudioCardProps> = ({ title, description, audioUrl, isListed, onToggleList }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Add logic to play or pause audio
    // You may want to use a library like Howler.js for better audio control
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-lg p-4">
        <audio controls className="w-full mt-4" onPlay={handlePlayPause} onPause={handlePlayPause}>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <h2 className="text-xl font-bold text-black p-1">{title}</h2>
      <p className="text-gray-600 p-1">{description}</p>

      

      <button
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}
        onClick={onToggleList}
      >
        {isListed ? 'Unlist' : 'List'}
      </button>
    </div>
  );
};

export default AudioCardProfile;
