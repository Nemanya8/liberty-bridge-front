import React, { useEffect, useRef, useState } from 'react';
import { 
  type BaseError,
  useSendTransaction, 
  useWaitForTransactionReceipt
} from 'wagmi';
import { parseEther } from 'viem';

// Keyframe animation for continuous gradient movement
const keyframes = `
@keyframes gradientShift {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}`;

const FormComponente2g: React.FC = () => {
  const { 
    data: hash,
    error, 
    isPending,
    sendTransaction 
  } = useSendTransaction();
  
  const formRef = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as `0x${string}`;
    const value = formData.get('value') as string;
    sendTransaction({ to, value: parseEther(value) });
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (!isConfirming && hash && formRef.current) {
      setMessage('Transaction successful!');
    }
  }, [isConfirming, hash]);

  useEffect(() => {
    if (error) {
      setMessage(`Error: ${(error as BaseError).shortMessage || error.message}`);
    }
  }, [error]);

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '70%',
    height: '50vh',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  };

  const formGroupStyle = {
    position: 'relative',
    padding: '15px 0 0',
    marginTop: '10px',
    width: '70%',
  };

  const inputStyle = {
    fontFamily: 'inherit',
    width: '100%',
    border: '0',
    borderBottom: '3px solid #9b9b9b', // Thicker line
    outline: '0',
    fontSize: '1.3rem',
    color: '#000', // Black text color
    padding: '7px 0',
    background: 'transparent',
    transition: 'border-color 0.2s',
    '::placeholder': {
      color: '#9b9b9b',
    },
    ':focus': {
      borderBottom: '3px solid',
      borderImage: 'linear-gradient(to right, #11998e, #38ef7d)',
      borderImageSlice: 1,
      paddingBottom: '6px',
      fontWeight: '700',
    },
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, red, blue)', // Gradient transition from red to blue
    backgroundSize: '200% 100%',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'background 0.7s ease, color 0.5s ease, transform 0.5s ease', // Slower transitions
    width: '70%',
    display: 'block',
    margin: '20px auto 0 auto',
    animation: 'gradientShift 8s linear infinite', // Slower gradient animation
  };

  const messageStyle = {
    marginBottom: '20px',
    fontSize: '1rem',
    color: '#333',
    wordBreak: 'break-all',
    textAlign: 'center',
    visibility: message ? 'visible' : 'hidden',
  };

  return (
    <>
      <style>{keyframes}</style>
      <form ref={formRef} onSubmit={submit} style={formStyle}>
        <h1 style={{
          fontSize: '62px', /* Increased size for the title */
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, red, blue)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px', /* Reduced space between the title and the ConnectButton */
        }}>ETH 2 GETH</h1>
        <div style={messageStyle}>{message}</div>
        <div style={formGroupStyle}>
          <input
            type="text"
            placeholder="Address"
            name="address"
            id="address"
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <input
            type="text"
            placeholder="Amount"
            name="value"
            id="value"
            required
            style={inputStyle}
          />
        </div>
        <button
          disabled={isPending || isConfirming}
          type="submit"
          style={buttonStyle}
        >
          {isPending || isConfirming ? 'Confirming...' : 'Transfer'}
        </button>
      </form>
    </>
  );
};

export default FormComponente2g;
