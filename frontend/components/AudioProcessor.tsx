// components/AudioProcessor.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AudioProcessor: React.FC = () => {
    const [audioFile1, setAudioFile1] = useState<File | null>(null);
    const [audioFile2, setAudioFile2] = useState<File | null>(null);
    const [responseAudio, setResponseAudio] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            if (index === 0) {
                setAudioFile1(file);
            } else if (index === 1) {
                setAudioFile2(file);
            }
        }
    };

    const processAudio = async () => {
        if (!audioFile1 || !audioFile2) {
            console.error('Please upload both audio files.');
            return;
        }

        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append('audio1', audioFile1);
            formData.append('audio2', audioFile2);

            const response = await axios.post('https://95ce-14-195-9-98.ngrok-free.app/audio/overlay/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'arraybuffer',
            });
            console.log(">>", response.data)
            const blob = new Blob([response.data], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(blob);
            setResponseAudio(audioUrl);
            // const audio = new Audio(audioUrl);
            // audio.play();
        } catch (error: any) {
            console.error('Error processing audio:', error.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 0)} />
            <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 1)} />

            <button onClick={processAudio} disabled={processing}>
                {processing ? 'Processing...' : 'Process Audio'}
            </button>

            {responseAudio && (
                <div>
                    <p>Response Audio:</p>
                    <audio controls>
                        <source src={responseAudio} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default AudioProcessor;
