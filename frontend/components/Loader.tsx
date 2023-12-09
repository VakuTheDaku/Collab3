// components/Loader.tsx
import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css'; // Import the CSS module for styling
import { Spinner } from '@nextui-org/react';

const Loader = ({setStep, step}: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setStep(3)
    }, 2000);
    // Clear the timer when the component is unmounted or when loading is done
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <Spinner size='lg' />}
      
    </div>
  );
};

export default Loader;
