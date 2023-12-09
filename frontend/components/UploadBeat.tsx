// components/UploadBeat.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const UploadBeat = ({ setStep, plagiarism, setPlagiarism, setIscopied }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', selectedFile);
      setStep(2)
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual Django backend API endpoint
      const response = await axios.post('https://95ce-14-195-9-98.ngrok-free.app/audio/process/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded:', response.data);
      // You can perform additional actions after successful upload
      if (response.data.status === false) {
        console.log("error processing")
      }
      if (response.data.hasPlagiarism === true) {
        setIscopied(true)
        setPlagiarism(response.data.similarity)
      }
      else {
        setIscopied(false)
      }
      
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='grid'>
    <div className='flex gap-4 mt-2'>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button onClick={triggerFileInput} color='secondary' variant='shadow'>
        Choose Audio File
      </Button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <Button onClick={handleUpload} color='primary' variant='flat'>
        Upload
      </Button>
      </div>
      {/* <div>
        {
          plagiarism ? <div className='text-danger'>Detected a {(plagiarism * 100).toFixed(2)} % similarity to one of our beats</div> : <></>
        }
      </div> */}
    </div>
  );
};

export default UploadBeat;
