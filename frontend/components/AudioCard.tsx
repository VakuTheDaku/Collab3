// components/AudioCard.tsx
import React from 'react';

interface AudioCardProps {
  data: {
    title: string;
    description: string;
    audioUrl: string;
    price: number;
  };
}

const AudioCard: React.FC<AudioCardProps> = ({ data }) => {
  const { title, description, audioUrl, price } = data;

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-lg">
      <audio className="w-full" controls>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <div className="p-4">
        <h2 className="text-xl font-bold text-black" >{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="mt-2 text-lg font-bold">${price}</p>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AudioCard;
