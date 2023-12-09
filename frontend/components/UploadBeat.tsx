// components/UploadBeat.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const UploadBeat = ({ setStep }: any) => {
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

      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual Django backend API endpoint
      // const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // console.log('File uploaded:', response.data.fileName);
      // You can perform additional actions after successful upload
      setStep(2)
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
  );
};

export default UploadBeat;
