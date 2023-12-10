// components/AudioMixer.tsx
import { Button } from '@nextui-org/react';
import React, { useRef, useState } from 'react';

const AudioMixer: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);

  const [audioBuffer1, setAudioBuffer1] = useState<AudioBuffer | null>(null);
  const [audioBuffer2, setAudioBuffer2] = useState<AudioBuffer | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current?.decodeAudioData(arrayBuffer);

      if (audioBuffer) {
        if (index === 0) {
          setAudioBuffer1(audioBuffer);
        } else if (index === 1) {
          setAudioBuffer2(audioBuffer);
        }
        console.log(`Audio file ${index + 1} loaded successfully!`);
      }
    } catch (error: any) {
      console.error(`Error loading audio file ${index + 1}:`, error.message);
    }
  };

  const mixAndPlayAudio = () => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const destination = context.createGain();

    const source1 = context.createBufferSource();
    const source2 = context.createBufferSource();

    source1.buffer = audioBuffer1!;
    source2.buffer = audioBuffer2!;

    const gainNode1 = context.createGain();
    const gainNode2 = context.createGain();

    source1.connect(gainNode1);
    source2.connect(gainNode2);

    gainNode1.connect(destination);
    gainNode2.connect(destination);

    destination.connect(context.destination);

    // Adjust the gain values based on your mixing requirements
    gainNode1.gain.value = 0.5;
    gainNode2.gain.value = 0.5;

    source1.start();
    source2.start();

    setPlaying(true);

    // Determine the duration of the audio files and set a timeout to stop playing after the longer one
    const duration = Math.max(source1.buffer.duration, source2.buffer.duration);
    setTimeout(() => {
      context.close().then(() => {
        setPlaying(false);
      });
    }, duration * 1000);
  };

  const handleMixAndPlayButtonClick = () => {
    audioContextRef.current = new AudioContext();
    mixAndPlayAudio();
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-md shadow-lg p-4 space-y-4">
      <div className="p-10 flex flex-col items-center">
        <p className="mb-4">Audio 1</p>
        <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 0)} />
      </div>
      <div className="p-10 flex flex-col items-center">
        <p className="mb-4">Audio 2</p>
        <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 1)} />
      </div>
      <div className='grid gap-4'>
        <Button
          color='primary'
          onClick={handleMixAndPlayButtonClick}
          disabled={playing}
        >
          {playing ? 'Mixing and Playing...' : 'Mix and Play Audio'}
        </Button>

        <Button color='warning' variant="bordered">
          Fuse with your music ?
        </Button>
      </div>
    </div>
  );
};

export default AudioMixer;
