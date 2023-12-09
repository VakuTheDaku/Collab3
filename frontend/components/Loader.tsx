// components/Loader.tsx
import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css'; // Import the CSS module for styling
import { Spinner } from '@nextui-org/react';

const Loader = ({setStep, step, plagiarism, iscopied}: any) => {

  return (
    <div className='mt-2'>
      {iscopied!==undefined ? iscopied === true ? <div className='text-danger'>{(plagiarism*100).toFixed(2)} % similarity to one song spotted</div>: <div className='text-success'>You are good to go!</div> : <Spinner size='lg' />}
      
    </div>
  );
};

export default Loader;
