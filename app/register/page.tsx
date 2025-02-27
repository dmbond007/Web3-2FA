"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import RegisterForm from './Registration'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'

export default function Register() {
  
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [registrationData, setRegistrationData] = useState();
  const {address, isConnected} = useAccount()

  const handleClick = async () => {
    console.log("Form Submitted:", registrationData);
    console.log(address)
    setSubmitted(true);
    setFinished(true)
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
      
      {finished ? (
        <div>
          <p className="text-green-600 text-center">Registration successful!</p>
          <button
            onClick={()=>redirect('/')}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go back to the home page
          </button>
        </div>
        
      ) : (
        submitted ? (
          <div>
            <p className="text-green-600 text-center">Setup your second factor authentication</p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: 12,
            }}>
              <ConnectButton />
            </div>
              <button
                onClick={() => handleClick()}
                className="w-full text-white font-semibold py-2 rounded-lg transition 
                  bg-blue-500 hover:bg-blue-600 
                  disabled:bg-gray-400 disabled:pointer-events-none"
                disabled={!isConnected}
              >
                Save my second factor
              </button>
            </div>
        ) : (<RegisterForm setSubmitted={setSubmitted} setData={setRegistrationData}/>)
      )}
    </div>
  );
}
